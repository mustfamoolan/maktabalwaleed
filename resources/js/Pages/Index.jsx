import GuestLayout from '@/Layouts/GuestLayout';
import { Link } from '@inertiajs/react';

export default function Index() {
    const sections = [
        {
            title: 'المقر الرئيسي',
            description: 'لوحة تحكم الإدارة العامة',
            href: '/headquarters/login',
            color: 'bg-blue-500',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
            )
        },
        {
            title: 'المندوبين',
            description: 'بوابة المندوبين والتوصيل',
            href: '/representatives/login',
            color: 'bg-green-500',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            )
        },
        {
            title: 'السائقين',
            description: 'بوابة السائقين والتوصيل',
            href: '/drivers/login',
            color: 'bg-yellow-500',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                </svg>
            )
        },
        {
            title: 'المجهزين',
            description: 'بوابة تجهيز وإعداد الطلبات',
            href: '/preparers/login',
            color: 'bg-purple-500',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
            )
        },
        {
            title: 'العملاء',
            description: 'تصفح الكتب والمنتجات',
            href: '/customers',
            color: 'bg-indigo-500',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            )
        }
    ];

    return (
        <GuestLayout title="مكتبة الوليد - الرئيسية">
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="w-full max-w-4xl">
                    {/* العنوان الرئيسي */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            مكتبة الوليد
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            نظام إدارة شامل للمكتبة مع أقسام منفصلة لكل فريق عمل
                        </p>
                    </div>

                    {/* الأقسام */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                        {sections.map((section, index) => (
                            <Link
                                key={index}
                                href={section.href}
                                className="group bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                            >
                                <div className="text-center">
                                    <div className={`mx-auto w-16 h-16 ${section.color} rounded-xl flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform duration-300`}>
                                        {section.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                                        {section.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm">
                                        {section.description}
                                    </p>
                                    <div className="mt-4 text-blue-500 group-hover:text-blue-600 font-medium">
                                        الدخول ←
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* معلومات إضافية */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                            معلومات النظام
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-3">
                                <h3 className="font-semibold text-gray-800">المقر الرئيسي:</h3>
                                <ul className="text-sm text-gray-600 space-y-1">
                                    <li>• إدارة عامة للنظام</li>
                                    <li>• مراقبة جميع العمليات</li>
                                    <li>• إدارة المستخدمين</li>
                                </ul>
                            </div>
                            <div className="space-y-3">
                                <h3 className="font-semibold text-gray-800">فرق العمل:</h3>
                                <ul className="text-sm text-gray-600 space-y-1">
                                    <li>• المندوبين: إدارة الطلبات</li>
                                    <li>• السائقين: التوصيل والنقل</li>
                                    <li>• المجهزين: تحضير الطلبات</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* حقوق النشر */}
                    <div className="mt-12 text-center">
                        <p className="text-gray-400 text-sm">
                            © 2025 مكتبة الوليد. جميع الحقوق محفوظة.
                        </p>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
