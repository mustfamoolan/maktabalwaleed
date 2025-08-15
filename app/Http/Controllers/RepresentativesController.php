<?php

namespace App\Http\Controllers;

use App\Models\Representative;
use App\Models\RepresentativeCommissionPlan;
use App\Models\RepresentativeTarget;
use App\Models\Sale;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class RepresentativesController extends Controller
{
    public function index()
    {
        $representatives = Representative::with(['commissionPlans', 'sales'])
            ->get()
            ->map(function ($rep) {
                $currentMonth = Carbon::now()->month;
                $currentYear = Carbon::now()->year;
                $stats = $rep->getMonthlyStats($currentMonth, $currentYear);

                return [
                    'id' => $rep->id,
                    'name' => $rep->name,
                    'phone' => $rep->phone,
                    'status' => $rep->status,
                    'monthly_target' => $rep->monthly_target,
                    'current_sales' => $stats['total_sales'],
                    'achievement_percentage' => $rep->monthly_target > 0 ?
                        round(($stats['total_sales'] / $rep->monthly_target) * 100, 2) : 0,
                    'commission_earned' => $stats['commission_earned'],
                    'total_debt' => $stats['total_debt'],
                    'cartons_sold' => $stats['total_cartons'],
                ];
            });

        return Inertia::render('Headquarters/RepresentativesSimple', [
            'representatives' => $representatives,
            'pageTitle' => 'إدارة المندوبين'
        ]);
    }

    public function show($id)
    {
        $representative = Representative::with([
            'commissionPlans',
            'targets',
            'sales.product',
            'sales.supplier'
        ])->findOrFail($id);

        $currentMonth = Carbon::now()->month;
        $currentYear = Carbon::now()->year;
        $stats = $representative->getMonthlyStats($currentMonth, $currentYear);

        return Inertia::render('Headquarters/RepresentativeDetails', [
            'representative' => [
                'id' => $representative->id,
                'name' => $representative->name,
                'phone' => $representative->phone,
                'identity_number' => $representative->identity_number,
                'address' => $representative->address,
                'status' => $representative->status,
                'areas' => $representative->areas,
                'product_categories' => $representative->product_categories,
                'monthly_target' => $representative->monthly_target,
                'hire_date' => $representative->hire_date->format('Y-m-d'),
                'notes' => $representative->notes,
                'commission_plan' => $representative->activeCommissionPlan(),
                'monthly_stats' => $stats,
            ],
            'pageTitle' => 'تفاصيل المندوب'
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|unique:representatives',
            'identity_number' => 'required|string|unique:representatives',
            'address' => 'required|string',
            'areas' => 'nullable|array',
            'product_categories' => 'nullable|array',
            'monthly_target' => 'nullable|numeric|min:0',
            'hire_date' => 'required|date',
            'notes' => 'nullable|string',
        ]);

        $representative = Representative::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'تم إضافة المندوب بنجاح',
            'representative' => $representative
        ]);
    }

    public function update(Request $request, $id)
    {
        $representative = Representative::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|unique:representatives,phone,' . $id,
            'identity_number' => 'required|string|unique:representatives,identity_number,' . $id,
            'address' => 'required|string',
            'status' => 'required|in:active,inactive,suspended',
            'areas' => 'nullable|array',
            'product_categories' => 'nullable|array',
            'monthly_target' => 'nullable|numeric|min:0',
            'notes' => 'nullable|string',
        ]);

        $representative->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'تم تحديث بيانات المندوب بنجاح'
        ]);
    }

    public function destroy($id)
    {
        $representative = Representative::findOrFail($id);
        $representative->delete();

        return response()->json([
            'success' => true,
            'message' => 'تم حذف المندوب بنجاح'
        ]);
    }

    // إدارة خطط العمولة
    public function storeCommissionPlan(Request $request, $representativeId)
    {
        $validated = $request->validate([
            'plan_type' => 'required|in:target_based,box_based,profit_based',
            'fixed_salary' => 'required|numeric|min:0',
            'target_settings' => 'nullable|array',
            'box_target' => 'nullable|integer|min:0',
            'box_commission' => 'nullable|numeric|min:0',
            'profit_percentage' => 'nullable|numeric|min:0|max:100',
            'minimum_performance_rate' => 'required|numeric|min:0|max:100',
            'notes' => 'nullable|string',
        ]);

        $validated['representative_id'] = $representativeId;
        $validated['is_active'] = true;

        // إلغاء تفعيل الخطط الأخرى
        RepresentativeCommissionPlan::where('representative_id', $representativeId)
            ->update(['is_active' => false]);

        $plan = RepresentativeCommissionPlan::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'تم إضافة خطة العمولة بنجاح',
            'plan' => $plan
        ]);
    }

    // تقارير الأداء
    public function performanceReport(Request $request)
    {
        $month = $request->get('month', Carbon::now()->month);
        $year = $request->get('year', Carbon::now()->year);

        $representatives = Representative::with(['sales', 'commissionPlans'])
            ->get()
            ->map(function ($rep) use ($month, $year) {
                $stats = $rep->getMonthlyStats($month, $year);
                $salesBySupplier = $rep->sales()
                    ->with('supplier')
                    ->whereMonth('sale_date', $month)
                    ->whereYear('sale_date', $year)
                    ->get()
                    ->groupBy('supplier_id')
                    ->map(function ($sales) {
                        return [
                            'supplier_name' => $sales->first()->supplier->name,
                            'total_amount' => $sales->sum('total_amount'),
                            'total_cartons' => $sales->sum('cartons_sold'),
                            'total_profit' => $sales->sum('profit_amount'),
                        ];
                    });

                return [
                    'representative' => [
                        'id' => $rep->id,
                        'name' => $rep->name,
                        'phone' => $rep->phone,
                        'status' => $rep->status,
                    ],
                    'stats' => $stats,
                    'sales_by_supplier' => $salesBySupplier,
                    'target_achievement' => $rep->monthly_target > 0 ?
                        round(($stats['total_sales'] / $rep->monthly_target) * 100, 2) : 0,
                ];
            });

        return response()->json($representatives);
    }

    // تقرير مفصل لمندوب واحد
    public function detailedReport($id, Request $request)
    {
        $representative = Representative::findOrFail($id);
        $month = $request->get('month', Carbon::now()->month);
        $year = $request->get('year', Carbon::now()->year);

        $sales = $representative->sales()
            ->with(['product', 'supplier'])
            ->whereMonth('sale_date', $month)
            ->whereYear('sale_date', $year)
            ->get();

        $stats = $representative->getMonthlyStats($month, $year);

        // تحليل بيانات المبيعات
        $salesByCategory = $sales->groupBy('product.category');
        $salesBySupplier = $sales->groupBy('supplier_id');

        return response()->json([
            'representative' => $representative,
            'stats' => $stats,
            'sales' => $sales,
            'sales_by_category' => $salesByCategory,
            'sales_by_supplier' => $salesBySupplier,
            'period' => ['month' => $month, 'year' => $year]
        ]);
    }
}
