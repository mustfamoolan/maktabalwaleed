import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import HeadquartersLayout from '@/Layouts/HeadquartersLayout';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

// Chart Component using Chart.js
const DailySalesChart = ({ data, title = "المبيعات اليومية" }) => {
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                align: 'start',
                labels: {
                    font: {
                        family: 'Arial',
                        size: 12
                    },
                    color: '#6b7280'
                }
            },
            title: {
                display: false
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                titleColor: '#fff',
                bodyColor: '#fff',
                borderColor: '#10b981',
                borderWidth: 1,
                callbacks: {
                    label: function(context) {
                        return `المبيعات: ${new Intl.NumberFormat('en-US').format(context.parsed.y)} د.ع`;
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: '#e5e7eb',
                    lineWidth: 1
                },
                ticks: {
                    color: '#6b7280',
                    font: {
                        size: 11
                    },
                    callback: function(value) {
                        return new Intl.NumberFormat('en-US').format(value);
                    }
                }
            },
            x: {
                grid: {
                    color: '#e5e7eb',
                    lineWidth: 1
                },
                ticks: {
                    color: '#6b7280',
                    font: {
                        size: 11
                    }
                }
            }
        },
        elements: {
            line: {
                tension: 0.1
            },
            point: {
                radius: 4,
                hoverRadius: 6
            }
        }
    };

    const chartData = {
        labels: data.map(item => item.date),
        datasets: [
            {
                label: 'المبيعات',
                data: data.map(item => item.value),
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                borderWidth: 3,
                fill: true,
                pointBackgroundColor: '#10b981',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
            },
        ],
    };

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            </div>
            <div style={{ height: '300px' }}>
                <Line data={chartData} options={options} />
            </div>
        </div>
    );
};export default function Suppliers() {
    const [activeTab, setActiveTab] = useState('overview');
    const [selectedSupplier, setSelectedSupplier] = useState(null);

    // Mock data for suppliers
    const suppliers = [
        {
            id: 1,
            name: 'شركة سدرة العائلة',
            contact: 'أحمد محمد',
            phone: '07701234567',
            address: 'بغداد - الكرادة',
            categories: ['منظفات', 'مواد غذائية'],
            rating: 4.5,
            totalProducts: 45,
            totalSales: 25800000,
            lastOrder: '2025-08-10',
            status: 'نشط',
            cleaningProducts: 20,
            foodProducts: 25,
            performance: {
                currentMonth: 3200000,
                lastMonth: 2800000,
                trend: 'up'
            }
        },
        {
            id: 2,
            name: 'شركة جيهان',
            contact: 'فاطمة علي',
            phone: '07719876543',
            address: 'البصرة - المعقل',
            categories: ['منظفات', 'مواد غذائية'],
            rating: 4.2,
            totalProducts: 38,
            totalSales: 18500000,
            lastOrder: '2025-08-08',
            status: 'نشط',
            cleaningProducts: 15,
            foodProducts: 23,
            performance: {
                currentMonth: 2100000,
                lastMonth: 2400000,
                trend: 'down'
            }
        },
        {
            id: 3,
            name: 'مؤسسة النور التجارية',
            contact: 'محمد حسن',
            phone: '07781122334',
            address: 'أربيل - عنكاوا',
            categories: ['منظفات'],
            rating: 4.0,
            totalProducts: 22,
            totalSales: 12300000,
            lastOrder: '2025-08-12',
            status: 'نشط',
            cleaningProducts: 22,
            foodProducts: 0,
            performance: {
                currentMonth: 1800000,
                lastMonth: 1600000,
                trend: 'up'
            }
        }
    ];

    const productsBySupplier = {
        1: [
            { name: 'تايد', category: 'منظفات', quantity: 50, sales: 1200000 },
            { name: 'زاهي', category: 'منظفات', quantity: 30, sales: 800000 },
            { name: 'تمن عنبر', category: 'مواد غذائية', quantity: 100, sales: 2500000 },
            { name: 'معجون طماطم', category: 'مواد غذائية', quantity: 75, sales: 900000 }
        ],
        2: [
            { name: 'صابون سائل', category: 'منظفات', quantity: 40, sales: 600000 },
            { name: 'شامبو', category: 'منظفات', quantity: 25, sales: 750000 },
            { name: 'رز بسمتي', category: 'مواد غذائية', quantity: 80, sales: 1800000 },
            { name: 'زيت طبخ', category: 'مواد غذائية', quantity: 60, sales: 1200000 }
        ],
        3: [
            { name: 'مسحوق غسيل', category: 'منظفات', quantity: 35, sales: 850000 },
            { name: 'ملمع أثاث', category: 'منظفات', quantity: 20, sales: 400000 },
            { name: 'معطر جو', category: 'منظفات', quantity: 15, sales: 300000 }
        ]
    };

    // Daily sales data for charts
    const dailySalesData = {
        1: [ // شركة سدرة العائلة
            { date: '2025/8/13', value: 450000 },
            { date: '2025/8/14', value: 380000 },
            { date: '2025/8/15', value: 520000 },
            { date: '2025/8/16', value: 290000 },
            { date: '2025/8/17', value: 180000 },
            { date: '2025/8/18', value: 0 }
        ],
        2: [ // شركة جيهان
            { date: '2025/8/13', value: 320000 },
            { date: '2025/8/14', value: 280000 },
            { date: '2025/8/15', value: 410000 },
            { date: '2025/8/16', value: 250000 },
            { date: '2025/8/17', value: 150000 },
            { date: '2025/8/18', value: 0 }
        ],
        3: [ // مؤسسة النور التجارية
            { date: '2025/8/13', value: 180000 },
            { date: '2025/8/14', value: 220000 },
            { date: '2025/8/15', value: 290000 },
            { date: '2025/8/16', value: 160000 },
            { date: '2025/8/17', value: 120000 },
            { date: '2025/8/18', value: 0 }
        ]
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US').format(amount) + ' د.ع';
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'نشط': return 'bg-green-100 text-green-800 border-green-200';
            case 'متوقف': return 'bg-red-100 text-red-800 border-red-200';
            case 'قيد المراجعة': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getTrendIcon = (trend) => {
        if (trend === 'up') {
            return (
                <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                </svg>
            );
        } else if (trend === 'down') {
            return (
                <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                </svg>
            );
        }
        return null;
    };

    return (
        <HeadquartersLayout>
            <Head title="إدارة الموردين" />

            <div className="p-6 space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">إدارة الموردين</h1>
                        <p className="text-gray-600 mt-1">إدارة شبكة الموردين وتتبع الأداء</p>
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 space-x-reverse">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        <span>إضافة مورد جديد</span>
                    </button>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-2xl font-bold text-blue-600">{suppliers.length}</div>
                                <div className="text-sm text-gray-600">إجمالي الموردين</div>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-2xl font-bold text-green-600">{suppliers.filter(s => s.status === 'نشط').length}</div>
                                <div className="text-sm text-gray-600">موردين نشطين</div>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-2xl font-bold text-purple-600">{suppliers.reduce((sum, s) => sum + s.totalProducts, 0)}</div>
                                <div className="text-sm text-gray-600">إجمالي المنتجات</div>
                            </div>
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-2xl font-bold text-orange-600">{formatCurrency(suppliers.reduce((sum, s) => sum + s.totalSales, 0))}</div>
                                <div className="text-sm text-gray-600">إجمالي المبيعات</div>
                            </div>
                            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8 space-x-reverse">
                        {[
                            { id: 'overview', name: 'نظرة عامة', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
                            { id: 'performance', name: 'تقارير الأداء', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
                            { id: 'products', name: 'منتجات الموردين', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`${
                                    activeTab === tab.id
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                } whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 space-x-reverse`}
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
                                </svg>
                                <span>{tab.name}</span>
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Tab Content */}
                {activeTab === 'overview' && (
                    <div className="space-y-6">
                        {/* Suppliers List */}
                        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-900">قائمة الموردين</h3>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">المورد</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">التخصص</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">المنتجات</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">إجمالي المبيعات</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">التقييم</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الحالة</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">العمليات</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {suppliers.map((supplier) => (
                                            <tr key={supplier.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4">
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900">{supplier.name}</div>
                                                        <div className="text-sm text-gray-500">{supplier.contact}</div>
                                                        <div className="text-xs text-gray-400">{supplier.phone}</div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-wrap gap-1">
                                                        {supplier.categories.map((category, index) => (
                                                            <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                                {category}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-900">{supplier.totalProducts}</td>
                                                <td className="px-6 py-4 text-sm text-gray-900">{formatCurrency(supplier.totalSales)}</td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center">
                                                        <div className="flex text-yellow-400">
                                                            {[...Array(5)].map((_, i) => (
                                                                <svg key={i} className={`w-4 h-4 ${i < Math.floor(supplier.rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                                </svg>
                                                            ))}
                                                        </div>
                                                        <span className="mr-1 text-sm text-gray-600">{supplier.rating}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(supplier.status)}`}>
                                                        {supplier.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center space-x-2 space-x-reverse">
                                                        <Link
                                                            href={`/headquarters/suppliers/${supplier.id}`}
                                                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                                        >
                                                            عرض التفاصيل
                                                        </Link>
                                                        <button className="text-gray-400 hover:text-gray-600">
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'performance' && (
                    <div className="space-y-6">
                        {/* Performance Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {suppliers.map((supplier) => (
                                <div key={supplier.id} className="bg-white rounded-xl border border-gray-200 p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-semibold text-gray-900">{supplier.name}</h3>
                                        {getTrendIcon(supplier.performance.trend)}
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <div className="text-sm text-gray-600">الشهر الحالي</div>
                                            <div className="text-xl font-bold text-gray-900">{formatCurrency(supplier.performance.currentMonth)}</div>
                                        </div>

                                        <div>
                                            <div className="text-sm text-gray-600">الشهر الماضي</div>
                                            <div className="text-lg text-gray-700">{formatCurrency(supplier.performance.lastMonth)}</div>
                                        </div>

                                        <div className="pt-4 border-t border-gray-200">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-600">منظفات</span>
                                                <span className="font-medium">{supplier.cleaningProducts} منتج</span>
                                            </div>
                                            <div className="flex justify-between text-sm mt-1">
                                                <span className="text-gray-600">مواد غذائية</span>
                                                <span className="font-medium">{supplier.foodProducts} منتج</span>
                                            </div>
                                        </div>

                                        {/* Quick access to detailed chart */}
                                        <Link
                                            href={`/headquarters/suppliers/${supplier.id}`}
                                            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm text-center block"
                                        >
                                            عرض التفاصيل الكاملة
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}                {activeTab === 'products' && selectedSupplier && (
                    <div className="space-y-6">
                        {/* Detailed Sales Chart for Selected Supplier */}
                        <DailySalesChart
                            data={dailySalesData[selectedSupplier.id]}
                            title={`تفاصيل المبيعات اليومية - ${selectedSupplier.name}`}
                        />

                        <div className="bg-white rounded-xl border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">منتجات {selectedSupplier.name}</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-medium text-gray-900 mb-3">المنظفات</h4>
                                    <div className="space-y-2">
                                        {productsBySupplier[selectedSupplier.id]?.filter(p => p.category === 'منظفات').map((product, index) => (
                                            <div key={index} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                                                <div>
                                                    <div className="font-medium">{product.name}</div>
                                                    <div className="text-sm text-gray-600">الكمية: {product.quantity}</div>
                                                </div>
                                                <div className="text-sm font-medium text-blue-600">
                                                    {formatCurrency(product.sales)}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-medium text-gray-900 mb-3">المواد الغذائية</h4>
                                    <div className="space-y-2">
                                        {productsBySupplier[selectedSupplier.id]?.filter(p => p.category === 'مواد غذائية').map((product, index) => (
                                            <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                                                <div>
                                                    <div className="font-medium">{product.name}</div>
                                                    <div className="text-sm text-gray-600">الكمية: {product.quantity}</div>
                                                </div>
                                                <div className="text-sm font-medium text-green-600">
                                                    {formatCurrency(product.sales)}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </HeadquartersLayout>
    );
}
