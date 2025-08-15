<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\SuppliersController;
use App\Http\Controllers\RepresentativesController;

// الصفحة الرئيسية - عرض جميع الأقسام
Route::get('/', function () {
    return Inertia::render('Index');
})->name('home');

// للوصول المباشر للعملاء أيضاً
Route::get('/home', function () {
    return redirect('/');
});

// ==================== المقر الرئيسي ====================
Route::prefix('headquarters')->group(function () {
    // صفحة تسجيل الدخول
    Route::get('/login', function () {
        return Inertia::render('Headquarters/Login');
    })->name('headquarters.login');

    // معالجة تسجيل الدخول
    Route::post('/login', function () {
        // سيتم إضافة المنطق لاحقاً
        return redirect('/headquarters/dashboard');
    });

    // لوحة التحكم (محمية)
    Route::get('/dashboard', function () {
        return Inertia::render('Headquarters/Dashboard');
    })->name('headquarters.dashboard');

    // نقطة البيع
    Route::get('/pos', function () {
        return Inertia::render('Headquarters/POS');
    })->name('headquarters.pos');

    // المخزن
    Route::get('/warehouse', function () {
        return Inertia::render('Headquarters/Warehouse');
    })->name('headquarters.warehouse');

    // الموردين
    Route::get('/suppliers', [SuppliersController::class, 'index'])->name('headquarters.suppliers');

    // تفاصيل مورد معين
    Route::get('/suppliers/{id}', [SuppliersController::class, 'show'])->name('headquarters.supplier.details');

    // المندوبين
    Route::get('/representatives', [RepresentativesController::class, 'index'])->name('headquarters.representatives');

    // تفاصيل مندوب معين
    Route::get('/representatives/{id}', [RepresentativesController::class, 'show'])->name('headquarters.representative.details');

    // السائقين
    Route::get('/drivers', function () {
        return Inertia::render('Headquarters/Drivers');
    })->name('headquarters.drivers');

    // المجهزين
    Route::get('/preparers', function () {
        return Inertia::render('Headquarters/Preparers');
    })->name('headquarters.preparers');
});

// ==================== المندوبين ====================
Route::prefix('representatives')->group(function () {
    // صفحة تسجيل الدخول
    Route::get('/login', function () {
        return Inertia::render('Representatives/Login');
    })->name('representatives.login');

    // معالجة تسجيل الدخول
    Route::post('/login', function () {
        // سيتم إضافة المنطق لاحقاً
        return redirect('/representatives/dashboard');
    });

    // لوحة التحكم (محمية)
    Route::get('/dashboard', function () {
        return Inertia::render('Representatives/Dashboard');
    })->name('representatives.dashboard');
});

// ==================== السائقين ====================
Route::prefix('drivers')->group(function () {
    // صفحة تسجيل الدخول
    Route::get('/login', function () {
        return Inertia::render('Drivers/Login');
    })->name('drivers.login');

    // معالجة تسجيل الدخول
    Route::post('/login', function () {
        // سيتم إضافة المنطق لاحقاً
        return redirect('/drivers/dashboard');
    });

    // لوحة التحكم (محمية)
    Route::get('/dashboard', function () {
        return Inertia::render('Drivers/Dashboard');
    })->name('drivers.dashboard');
});

// ==================== المجهزين ====================
Route::prefix('preparers')->group(function () {
    // صفحة تسجيل الدخول
    Route::get('/login', function () {
        return Inertia::render('Preparers/Login');
    })->name('preparers.login');

    // معالجة تسجيل الدخول
    Route::post('/login', function () {
        // سيتم إضافة المنطق لاحقاً
        return redirect('/preparers/dashboard');
    });

    // لوحة التحكم (محمية)
    Route::get('/dashboard', function () {
        return Inertia::render('Preparers/Dashboard');
    })->name('preparers.dashboard');
});

// ==================== العملاء ====================
Route::prefix('customers')->group(function () {
    // الصفحة الرئيسية للعملاء
    Route::get('/', function () {
        return Inertia::render('Customers/Index');
    })->name('customers.index');

    // كتالوج الكتب
    Route::get('/catalog', function () {
        return Inertia::render('Customers/Catalog');
    })->name('customers.catalog');

    // طلبات العميل
    Route::get('/orders', function () {
        return Inertia::render('Customers/Orders');
    })->name('customers.orders');
});
