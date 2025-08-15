import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import HeadquartersLayout from '@/Layouts/HeadquartersLayout';

export default function Dashboard() {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (date) => {
        return date.toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const mainSections = [
        {
            name: 'نقطة البيع',
            href: '/headquarters/pos',
            icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
            description: 'نظام إدارة المبيعات المباشرة',
            color: 'from-green-500 to-emerald-600',
            bgColor: 'bg-green-50',
            textColor: 'text-green-700',
            borderColor: 'border-green-200'
        },
        {
            name: 'المخزن',
            href: '/headquarters/warehouse',
            icon: 'M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z',
            description: 'إدارة المخزون والمنتجات',
            color: 'from-blue-500 to-indigo-600',
            bgColor: 'bg-blue-50',
            textColor: 'text-blue-700',
            borderColor: 'border-blue-200'
        },
        {
            name: 'الموردين',
            href: '/headquarters/suppliers',
            icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
            description: 'إدارة شبكة الموردين والمشتريات',
            color: 'from-purple-500 to-violet-600',
            bgColor: 'bg-purple-50',
            textColor: 'text-purple-700',
            borderColor: 'border-purple-200'
        },
        {
            name: 'المندوبين',
            href: '/headquarters/representatives',
            icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
            description: 'إدارة فريق المندوبين والمبيعات',
            color: 'from-orange-500 to-red-600',
            bgColor: 'bg-orange-50',
            textColor: 'text-orange-700',
            borderColor: 'border-orange-200'
        },
        {
            name: 'السائقين',
            href: '/headquarters/drivers',
            icon: 'M8 17l4 4 4-4m-4-5v9m-8.5-8.5l3 3L12 6l4.5 4.5 3-3M3 12h1m0 0h1m0 0h1M21 12h-1m0 0h-1m0 0h-1',
            description: 'إدارة فريق السائقين والتوصيل',
            color: 'from-yellow-500 to-amber-600',
            bgColor: 'bg-yellow-50',
            textColor: 'text-yellow-700',
            borderColor: 'border-yellow-200'
        },
        {
            name: 'المجهزين',
            href: '/headquarters/preparers',
            icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z',
            description: 'إدارة فريق تجهيز الطلبات',
            color: 'from-teal-500 to-cyan-600',
            bgColor: 'bg-teal-50',
            textColor: 'text-teal-700',
            borderColor: 'border-teal-200'
        }
    ];

    const quickStats = [
        {
            label: 'المبيعات اليوم',
            value: '12,500,000',
            unit: 'د.ع',
            icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2',
            color: 'text-green-600',
            bgColor: 'bg-green-50'
        },
        {
            label: 'الطلبات النشطة',
            value: '28',
            unit: 'طلب',
            icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
            color: 'text-blue-600',
            bgColor: 'bg-blue-50'
        },
        {
            label: 'المخزون المنخفض',
            value: '7',
            unit: 'منتج',
            icon: 'M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z',
            color: 'text-orange-600',
            bgColor: 'bg-orange-50'
        },
        {
            label: 'الموظفين النشطين',
            value: '15',
            unit: 'موظف',
            icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
            color: 'text-purple-600',
            bgColor: 'bg-purple-50'
        }
    ];

    return (
        <HeadquartersLayout>
            <Head title="المقر الرئيسي - لوحة التحكم" />

            <div className="p-6 space-y-6">
                {/* Header with Time */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 mb-2">
                                مرحباً بك في المقر الرئيسي
                            </h1>
                            <p className="text-gray-600">
                                إدارة شاملة لجميع عمليات مكتبة الوليد
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-blue-600">
                                {formatTime(currentTime)}
                            </div>
                            <div className="text-sm text-gray-500">
                                {formatDate(currentTime)}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {quickStats.map((stat, index) => (
                        <div
                            key={index}
                            className={`${stat.bgColor} rounded-xl p-6 border ${stat.color.replace('text-', 'border-').replace('600', '200')}`}
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="flex items-baseline space-x-2 space-x-reverse">
                                        <div className={`text-2xl font-bold ${stat.color}`}>
                                            {stat.value}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {stat.unit}
                                        </div>
                                    </div>
                                    <div className="text-sm text-gray-600 mt-1">
                                        {stat.label}
                                    </div>
                                </div>
                                <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                                    <svg className={`w-6 h-6 ${stat.color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={stat.icon} />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Main Sections */}
                <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-6">الأقسام الرئيسية</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {mainSections.map((section, index) => (
                            <Link
                                key={index}
                                href={section.href}
                                className={`${section.bgColor} rounded-xl p-6 border ${section.borderColor} hover:shadow-lg transition-all duration-200 transform hover:scale-105 group`}
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`w-12 h-12 bg-gradient-to-br ${section.color} rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-200`}>
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={section.icon} />
                                        </svg>
                                    </div>
                                    <svg className={`w-6 h-6 ${section.textColor} group-hover:translate-x-1 transition-transform duration-200`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12l4 4 4-4" />
                                    </svg>
                                </div>
                                <h3 className={`text-lg font-semibold ${section.textColor} mb-2`}>
                                    {section.name}
                                </h3>
                                <p className="text-gray-600 text-sm">
                                    {section.description}
                                </p>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">النشاط الأخير</h3>
                    <div className="space-y-4">
                        {[
                            { action: 'تم إنشاء طلب جديد', user: 'أحمد محمد', time: 'منذ 5 دقائق', type: 'success' },
                            { action: 'تم تحديث المخزون', user: 'سارة أحمد', time: 'منذ 10 دقائق', type: 'info' },
                            { action: 'تحذير: مخزون منخفض', user: 'النظام', time: 'منذ 15 دقيقة', type: 'warning' },
                            { action: 'تم تسليم طلب', user: 'محمد علي', time: 'منذ 20 دقيقة', type: 'success' }
                        ].map((activity, index) => (
                            <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                                <div className="flex items-center space-x-3 space-x-reverse">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                        activity.type === 'success' ? 'bg-green-100 text-green-600' :
                                        activity.type === 'warning' ? 'bg-orange-100 text-orange-600' :
                                        'bg-blue-100 text-blue-600'
                                    }`}>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                d={activity.type === 'success' ? 'M5 13l4 4L19 7' :
                                                  activity.type === 'warning' ? 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.232 16c-.77.833.192 2.5 1.732 2.5z' :
                                                  'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'} />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium text-gray-900">{activity.action}</div>
                                        <div className="text-xs text-gray-500">{activity.user}</div>
                                    </div>
                                </div>
                                <div className="text-xs text-gray-400">
                                    {activity.time}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </HeadquartersLayout>
    );
}
