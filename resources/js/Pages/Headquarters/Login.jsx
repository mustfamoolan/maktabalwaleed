import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';

export default function HeadquartersLogin() {
    const [showPassword, setShowPassword] = useState(false);
    const { data, setData, post, processing, errors } = useForm({
        phone: '',
        password: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/headquarters/login', {
            onSuccess: () => {
                // سيتم التوجيه إلى لوحة تحكم المقر الرئيسي
            }
        });
    };

    return (
        <GuestLayout title="تسجيل الدخول - المقر الرئيسي">
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    {/* كارت تسجيل الدخول */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 md:p-8">
                        {/* الشعار والعنوان */}
                        <div className="text-center mb-8">
                            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </div>
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                                المقر الرئيسي
                            </h1>
                            <p className="text-gray-600">
                                تسجيل دخول الإدارة العامة
                            </p>
                        </div>

                        {/* نموذج تسجيل الدخول */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* رقم الهاتف */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                                    رقم الهاتف
                                </label>
                                <div className="relative">
                                    <input
                                        type="tel"
                                        value={data.phone}
                                        onChange={(e) => setData('phone', e.target.value)}
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-right ${
                                            errors.phone
                                                ? 'border-red-300 focus:ring-red-500'
                                                : 'border-gray-300'
                                        }`}
                                        placeholder="07XXXXXXXXX"
                                        required
                                    />
                                    <div className="absolute inset-y-0 left-3 flex items-center">
                                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                </div>
                                {errors.phone && (
                                    <p className="mt-2 text-sm text-red-600 bg-red-50 px-3 py-1 rounded-md">
                                        {errors.phone}
                                    </p>
                                )}
                            </div>

                            {/* كلمة المرور */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                                    كلمة المرور
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-right ${
                                            errors.password
                                                ? 'border-red-300 focus:ring-red-500'
                                                : 'border-gray-300'
                                        }`}
                                        placeholder="أدخل كلمة المرور"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 left-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        {showPassword ? (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                                            </svg>
                                        ) : (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="mt-2 text-sm text-red-600 bg-red-50 px-3 py-1 rounded-md">
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            {/* أخطاء عامة */}
                            {errors.error && (
                                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                                    <div className="flex items-center gap-2">
                                        <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        <p className="text-sm text-red-600">{errors.error}</p>
                                    </div>
                                </div>
                            )}

                            {/* زر تسجيل الدخول */}
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-20 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {processing ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        <span>جاري تسجيل الدخول...</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center gap-2">
                                        <span>دخول لوحة التحكم</span>
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                        </svg>
                                    </div>
                                )}
                            </button>
                        </form>

                        {/* بيانات تجريبية */}
                        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <h3 className="text-blue-700 text-sm font-medium mb-3 flex items-center">
                                <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                </svg>
                                بيانات تجريبية - الإدارة
                            </h3>
                            <div className="text-xs text-blue-600 space-y-1">
                                <div><strong>الهاتف:</strong> 07742209251</div>
                                <div><strong>كلمة المرور:</strong> 12345678</div>
                            </div>
                        </div>
                    </div>

                    {/* نص حقوق النشر */}
                    <div className="mt-6 text-center">
                        <p className="text-gray-400 text-sm">
                            © 2025 مكتبة الوليد. جميع الحقوق محفوظة.
                        </p>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
