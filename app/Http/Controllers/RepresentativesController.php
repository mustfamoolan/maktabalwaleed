<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class RepresentativesController extends Controller
{
    public function index()
    {
        return Inertia::render('Headquarters/Representatives', [
            'pageTitle' => 'إدارة المندوبين'
        ]);
    }

    public function show($id)
    {
        return Inertia::render('Headquarters/RepresentativeDetails', [
            'representativeId' => $id,
            'pageTitle' => 'تفاصيل المندوب'
        ]);
    }

    // API endpoints for representatives management
    public function store(Request $request)
    {
        // Add new representative
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'email' => 'required|email|max:255',
            'area' => 'required|string|max:255',
            'base_salary' => 'required|numeric|min:0',
            'commission_plan' => 'required|in:targets,boxes,profit'
        ]);

        // Add representative logic here

        return response()->json(['message' => 'تم إضافة المندوب بنجاح']);
    }

    public function update(Request $request, $id)
    {
        // Update representative
        $validated = $request->validate([
            'name' => 'string|max:255',
            'phone' => 'string|max:20',
            'email' => 'email|max:255',
            'area' => 'string|max:255',
            'base_salary' => 'numeric|min:0',
            'commission_plan' => 'in:targets,boxes,profit',
            'is_active' => 'boolean'
        ]);

        // Update representative logic here

        return response()->json(['message' => 'تم تحديث بيانات المندوب بنجاح']);
    }

    public function destroy($id)
    {
        // Delete representative

        return response()->json(['message' => 'تم حذف المندوب بنجاح']);
    }

    // Commission calculation methods
    public function calculateTargetsCommission($representativeId, $month = null)
    {
        // Calculate commission based on targets system
        // This includes product-specific targets and supplier targets

        return response()->json([
            'commission_amount' => 0,
            'target_percentage' => 0,
            'details' => []
        ]);
    }

    public function calculateBoxesCommission($representativeId, $month = null)
    {
        // Calculate commission based on boxes sold
        // Fixed amount per box

        return response()->json([
            'commission_amount' => 0,
            'boxes_sold' => 0,
            'price_per_box' => 300
        ]);
    }

    public function calculateProfitCommission($representativeId, $month = null)
    {
        // Calculate commission based on profit margin
        // Percentage of the profit generated

        return response()->json([
            'commission_amount' => 0,
            'profit_percentage' => 20,
            'total_profit' => 0
        ]);
    }

    public function getPerformanceReport($representativeId, Request $request)
    {
        $month = $request->get('month', date('Y-m'));

        // Get comprehensive performance report for representative

        return response()->json([
            'sales_amount' => 0,
            'returned_goods' => 0,
            'total_boxes' => 0,
            'cash_collected' => 0,
            'invoices_count' => 0,
            'clients_debt' => 0,
            'profit' => 0,
            'efficiency_rate' => 0,
            'targets' => [],
            'supplier_breakdown' => []
        ]);
    }

    public function setTargets(Request $request, $representativeId)
    {
        // Set targets for representative
        $validated = $request->validate([
            'targets' => 'required|array',
            'targets.*.type' => 'required|in:product,supplier,category',
            'targets.*.target_id' => 'required',
            'targets.*.amount' => 'required|numeric|min:0',
            'targets.*.period' => 'required|in:monthly,quarterly,yearly'
        ]);

        // Set targets logic here

        return response()->json(['message' => 'تم تحديد الأهداف بنجاح']);
    }

    public function getTargetsProgress($representativeId, Request $request)
    {
        $month = $request->get('month', date('Y-m'));

        // Get targets progress for representative

        return response()->json([
            'food_products' => [
                'target' => 1500,
                'achieved' => 1355,
                'percentage' => 90.3,
                'remaining' => 145
            ],
            'cleaning_products' => [
                'target' => 1200,
                'achieved' => 980,
                'percentage' => 81.7,
                'remaining' => 220
            ],
            'suppliers' => []
        ]);
    }

    public function getCommissionSettings()
    {
        // Get global commission settings

        return response()->json([
            'minimum_performance_rate' => 80, // 80% to get full salary
            'commission_types' => [
                'targets' => [
                    'enabled' => true,
                    'bonus_rate' => 0.1, // 10% bonus for over-achievement
                    'penalty_rate' => 0.15 // 15% penalty for under-performance
                ],
                'boxes' => [
                    'enabled' => true,
                    'price_per_box' => 300
                ],
                'profit' => [
                    'enabled' => true,
                    'profit_share_percentage' => 20
                ]
            ]
        ]);
    }

    public function updateCommissionSettings(Request $request)
    {
        // Update global commission settings
        $validated = $request->validate([
            'minimum_performance_rate' => 'required|numeric|min:0|max:100',
            'commission_types' => 'required|array'
        ]);

        // Update settings logic here

        return response()->json(['message' => 'تم تحديث إعدادات الحوافز بنجاح']);
    }
}
