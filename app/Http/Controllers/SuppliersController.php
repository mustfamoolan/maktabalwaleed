<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class SuppliersController extends Controller
{
    public function index()
    {
        return Inertia::render('Headquarters/Suppliers');
    }

    public function show($id)
    {
        return Inertia::render('Headquarters/SupplierDetails', [
            'supplierId' => (int) $id
        ]);
    }
}
