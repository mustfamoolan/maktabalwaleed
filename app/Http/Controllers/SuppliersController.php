<?php

namespace App\Http\Controllers;

use App\Models\Supplier;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SuppliersController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->get('search');
        $category = $request->get('category');
        $status = $request->get('status', 'active');

        $suppliers = Supplier::query()
            ->when($search, function ($query, $search) {
                $query->search($search);
            })
            ->when($category, function ($query, $category) {
                $query->whereJsonContains('product_categories', $category);
            })
            ->when($status !== 'all', function ($query) use ($status) {
                $query->where('status', $status);
            })
            ->orderBy('name')
            ->paginate(15);

        return Inertia::render('Headquarters/SuppliersSimple', [
            'suppliers' => $suppliers,
            'categories' => Supplier::getProductCategories(),
            'filters' => [
                'search' => $search,
                'category' => $category,
                'status' => $status,
            ]
        ]);
    }

    public function create()
    {
        return Inertia::render('Headquarters/SupplierForm', [
            'categories' => Supplier::getProductCategories(),
            'supplier' => null
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'product_categories' => 'required|array|min:1',
            'product_categories.*' => 'string',
            'description' => 'nullable|string|max:1000',
            'notes' => 'nullable|string|max:1000',
        ]);

        $supplier = Supplier::create([
            'name' => $request->name,
            'description' => $request->description,
            'product_categories' => $request->product_categories,
            'notes' => $request->notes,
            'status' => 'active'
        ]);

        return redirect('/headquarters/suppliers')
            ->with('success', 'تم إضافة المورد بنجاح');
    }

    public function show($id)
    {
        $supplier = Supplier::findOrFail($id);

        return Inertia::render('Headquarters/SupplierDetails', [
            'supplier' => $supplier,
            'categories' => Supplier::getProductCategories(),
        ]);
    }

    public function edit($id)
    {
        $supplier = Supplier::findOrFail($id);

        return Inertia::render('Headquarters/SupplierForm', [
            'supplier' => $supplier,
            'categories' => Supplier::getProductCategories(),
        ]);
    }

    public function update(Request $request, $id)
    {
        $supplier = Supplier::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:255',
            'product_categories' => 'required|array|min:1',
            'product_categories.*' => 'string',
            'description' => 'nullable|string|max:1000',
            'notes' => 'nullable|string|max:1000',
            'status' => 'required|in:active,inactive',
        ]);

        $supplier->update([
            'name' => $request->name,
            'description' => $request->description,
            'product_categories' => $request->product_categories,
            'notes' => $request->notes,
            'status' => $request->status,
        ]);

        return redirect("/headquarters/suppliers/{$supplier->id}")
            ->with('success', 'تم تحديث بيانات المورد بنجاح');
    }

    public function destroy($id)
    {
        $supplier = Supplier::findOrFail($id);

        // يمكن إضافة فحص للتأكد من عدم وجود معاملات مرتبطة
        $supplier->delete();

        return redirect('/headquarters/suppliers')
            ->with('success', 'تم حذف المورد بنجاح');
    }

    public function toggleStatus($id)
    {
        $supplier = Supplier::findOrFail($id);
        $supplier->update([
            'status' => $supplier->status === 'active' ? 'inactive' : 'active'
        ]);

        $statusText = $supplier->status === 'active' ? 'تفعيل' : 'إلغاء تفعيل';

        return back()->with('success', "تم {$statusText} المورد بنجاح");
    }
}
