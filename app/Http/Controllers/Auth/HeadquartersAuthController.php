<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\HeadquartersUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class HeadquartersAuthController extends Controller
{
    /**
     * Show the login form
     */
    public function showLoginForm()
    {
        return Inertia::render('Headquarters/Login');
    }

    /**
     * Handle login request
     */
    public function login(Request $request)
    {
        $request->validate([
            'phone' => 'required|string',
            'password' => 'required|string',
        ]);

        // البحث عن المستخدم بالهاتف
        $user = HeadquartersUser::where('phone', $request->phone)
                                ->where('is_active', true)
                                ->first();

        // التحقق من كلمة المرور
        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'error' => 'البيانات المدخلة غير صحيحة. تأكد من رقم الهاتف وكلمة المرور.',
            ]);
        }

        // تسجيل الدخول
        Auth::guard('headquarters')->login($user);

        // تحديث وقت آخر دخول
        $user->updateLastLogin();

        // حفظ بيانات المستخدم في الجلسة
        $request->session()->put('headquarters_user', $user->getFullInfoAttribute());

        return redirect()->route('headquarters.dashboard');
    }

    /**
     * Handle logout request
     */
    public function logout(Request $request)
    {
        Auth::guard('headquarters')->logout();
        $request->session()->forget('headquarters_user');
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('headquarters.login');
    }

    /**
     * Get current authenticated user
     */
    public function user(Request $request)
    {
        $user = Auth::guard('headquarters')->user();

        if (!$user) {
            return response()->json(['error' => 'Unauthenticated'], 401);
        }

        return response()->json([
            'user' => $user->getFullInfoAttribute()
        ]);
    }

    /**
     * Check if user is authenticated
     */
    public function check(Request $request)
    {
        return response()->json([
            'authenticated' => Auth::guard('headquarters')->check(),
            'user' => Auth::guard('headquarters')->user()?->getFullInfoAttribute()
        ]);
    }
}
