import React, { useState, useEffect } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import HeadquartersLayout from '@/Layouts/HeadquartersLayout';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

export default function RepresentativeDetails() {
    const { representativeId } = usePage().props;
    const [activeTab, setActiveTab] = useState('performance');
    const [selectedPeriod, setSelectedPeriod] = useState('monthly');
    const [selectedMonth, setSelectedMonth] = useState('2025-08');

    // Mock data for the representative
    const representative = {
        id: representativeId,
        name: 'أحمد محمد علي',
        phone: '07701234567',
        email: 'ahmed@example.com',
        area: 'منطقة الكرادة',
        hireDate: '2023-01-15',
        baseSalary: 1000000,
        commissionPlan: 'targets',
        isActive: true,

        // Historical performance data
        monthlyPerformance: {
            '2025-08': {
                salesAmount: 15800000,
                returnedGoods: 420000,
                totalBoxes: 320,
                cashCollected: 14200000,
                invoicesCount: 45,
                clientsDebt: 1600000,
                profit: 1580000,
                targets: {
                    food: { target: 1500, achieved: 1355, percentage: 90.3 },
                    cleaning: { target: 1200, achieved: 980, percentage: 81.7 }
                }
            },
            '2025-07': {
                salesAmount: 14200000,
                returnedGoods: 380000,
                totalBoxes: 295,
                cashCollected: 13100000,
                invoicesCount: 42,
                clientsDebt: 1100000,
                profit: 1420000,
                targets: {
                    food: { target: 1500, achieved: 1180, percentage: 78.7 },
                    cleaning: { target: 1200, achieved: 1050, percentage: 87.5 }
                }
            },
            '2025-06': {
                salesAmount: 16800000,
                returnedGoods: 290000,
                totalBoxes: 350,
                cashCollected: 15200000,
                invoicesCount: 48,
                clientsDebt: 1300000,
                profit: 1680000,
                targets: {
                    food: { target: 1500, achieved: 1620, percentage: 108.0 },
                    cleaning: { target: 1200, achieved: 1150, percentage: 95.8 }
                }
            }
        },

        // Supplier-specific sales
        supplierSales: {
            'شركة جيهان': {
                target: 3000,
                achieved: 2000,
                remaining: 1000,
                category: 'غذائية',
                monthlyData: [1800, 1950, 2100, 2000, 1850, 2000]
            },
            'شركة الروان': {
                target: 4000,
                achieved: 2000,
                remaining: 2000,
                category: 'منظفات',
                monthlyData: [1600, 1800, 2200, 2000, 1900, 2000]
            },
            'شركة سدرة العائلة': {
                target: 2500,
                achieved: 1800,
                remaining: 700,
                category: 'مختلطة',
                monthlyData: [1400, 1600, 1750, 1800, 1700, 1800]
            }
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US').format(amount) + ' د.ع';
    };

    const formatNumber = (number) => {
        return new Intl.NumberFormat('en-US').format(number);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-GB', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getPerformanceColor = (percentage) => {
        if (percentage >= 100) return 'text-green-600';
        if (percentage >= 80) return 'text-yellow-600';
        return 'text-red-600';
    };

    const currentMonth = representative.monthlyPerformance[selectedMonth];

    // Charts data
    const salesTrendData = {
        labels: ['Mar 2025', 'Apr 2025', 'May 2025', 'Jun 2025', 'Jul 2025', 'Aug 2025'],
        datasets: [
            {
                label: 'المبيعات',
                data: [12000000, 13500000, 15200000, 16800000, 14200000, 15800000],
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.1
            },
            {
                label: 'الربح',
                data: [1200000, 1350000, 1520000, 1680000, 1420000, 1580000],
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.1
            }
        ]
    };

    const supplierPerformanceData = {
        labels: Object.keys(representative.supplierSales),
        datasets: [
            {
                label: 'المحقق',
                data: Object.values(representative.supplierSales).map(s => s.achieved),
                backgroundColor: '#10b981',
                borderColor: '#059669',
                borderWidth: 1
            },
            {
                label: 'الهدف',
                data: Object.values(representative.supplierSales).map(s => s.target),
                backgroundColor: '#e5e7eb',
                borderColor: '#9ca3af',
                borderWidth: 1
            }
        ]
    };

    const targetsComparisonData = {
        labels: ['المواد الغذائية', 'المنظفات'],
        datasets: [
            {
                data: [
                    currentMonth.targets.food.percentage,
                    currentMonth.targets.cleaning.percentage
                ],
                backgroundColor: ['#f59e0b', '#3b82f6'],
                borderColor: ['#d97706', '#2563eb'],
                borderWidth: 2
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: 'top', labels: { font: { size: 12 }, color: '#6b7280' } },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                callbacks: {
                    label: function(context) {
                        return `${context.dataset.label}: ${formatCurrency(context.parsed.y)}`;
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: { color: '#e5e7eb' },
                ticks: {
                    color: '#6b7280',
                    callback: function(value) { return formatCurrency(value); }
                }
            },
            x: { grid: { color: '#e5e7eb' }, ticks: { color: '#6b7280' } }
        }
    };

    const donutOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: 'bottom', labels: { font: { size: 12 }, color: '#6b7280' } },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                callbacks: {
                    label: function(context) {
                        return `${context.label}: ${context.parsed}%`;
                    }
                }
            }
        }
    };

    return (
        <HeadquartersLayout>
            <Head title={`تفاصيل المندوب - ${representative.name}`} />

            <div className="p-6 space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 space-x-reverse">
                        <Link
                            href="/headquarters/representatives"
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">{representative.name}</h1>
                            <p className="text-gray-600">{representative.area} - {representative.phone}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3 space-x-reverse">
                        <select
                            value={selectedMonth}
                            onChange={(e) => setSelectedMonth(e.target.value)}
                            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="2025-08">August 2025</option>
                            <option value="2025-07">July 2025</option>
                            <option value="2025-06">June 2025</option>
                        </select>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${
                            representative.isActive
                                ? 'bg-green-100 text-green-800 border-green-200'
                                : 'bg-red-100 text-red-800 border-red-200'
                        }`}>
                            {representative.isActive ? 'نشط' : 'غير نشط'}
                        </span>
                    </div>
                </div>

                {/* Representative Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-2xl font-bold text-blue-600">{formatCurrency(currentMonth.salesAmount)}</div>
                                <div className="text-sm text-gray-600">إجمالي المبيعات</div>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-2xl font-bold text-green-600">{formatCurrency(currentMonth.profit)}</div>
                                <div className="text-sm text-gray-600">الربح المحقق</div>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-2xl font-bold text-purple-600">{formatNumber(currentMonth.totalBoxes)}</div>
                                <div className="text-sm text-gray-600">إجمالي الكراتين</div>
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
                                <div className="text-2xl font-bold text-orange-600">{formatNumber(currentMonth.invoicesCount)}</div>
                                <div className="text-sm text-gray-600">عدد الفواتير</div>
                            </div>
                            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8 space-x-reverse">
                        {[
                            { id: 'performance', name: 'الأداء العام', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
                            { id: 'targets', name: 'الأهداف والإنجازات', icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z' },
                            { id: 'suppliers', name: 'أداء الموردين', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
                            { id: 'financial', name: 'التفاصيل المالية', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' }
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
                {activeTab === 'performance' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Sales Trend Chart */}
                        <div className="bg-white rounded-xl border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">اتجاه المبيعات والأرباح</h3>
                            <div style={{ height: '300px' }}>
                                <Line data={salesTrendData} options={chartOptions} />
                            </div>
                        </div>

                        {/* Performance Summary */}
                        <div className="bg-white rounded-xl border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">ملخص الأداء الشهري</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                                    <span className="text-sm text-gray-700">صافي المبيعات</span>
                                    <span className="font-bold text-green-600">
                                        {formatCurrency(currentMonth.salesAmount - currentMonth.returnedGoods)}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                                    <span className="text-sm text-gray-700">النقد المحصل</span>
                                    <span className="font-bold text-blue-600">
                                        {formatCurrency(currentMonth.cashCollected)}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                                    <span className="text-sm text-gray-700">ديون العملاء</span>
                                    <span className="font-bold text-orange-600">
                                        {formatCurrency(currentMonth.clientsDebt)}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                                    <span className="text-sm text-gray-700">البضاعة المرتجعة</span>
                                    <span className="font-bold text-red-600">
                                        {formatCurrency(currentMonth.returnedGoods)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'targets' && (
                    <div className="space-y-6">
                        {/* Targets Overview */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="bg-white rounded-xl border border-gray-200 p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">نسب تحقيق الأهداف</h3>
                                <div style={{ height: '250px' }}>
                                    <Doughnut data={targetsComparisonData} options={donutOptions} />
                                </div>
                            </div>

                            <div className="bg-white rounded-xl border border-gray-200 p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">تفصيل الأهداف</h3>
                                <div className="space-y-4">
                                    <div className="border border-gray-200 rounded-lg p-4">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-sm font-medium text-gray-700">المواد الغذائية</span>
                                            <span className={`text-sm font-bold ${getPerformanceColor(currentMonth.targets.food.percentage)}`}>
                                                {currentMonth.targets.food.percentage}%
                                            </span>
                                        </div>
                                        <div className="flex justify-between text-xs text-gray-600 mb-2">
                                            <span>الهدف: {formatNumber(currentMonth.targets.food.target)}</span>
                                            <span>المحقق: {formatNumber(currentMonth.targets.food.achieved)}</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-3">
                                            <div
                                                className={`h-3 rounded-full ${
                                                    currentMonth.targets.food.percentage >= 100 ? 'bg-green-500' :
                                                    currentMonth.targets.food.percentage >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                                                }`}
                                                style={{ width: `${Math.min(100, currentMonth.targets.food.percentage)}%` }}
                                            ></div>
                                        </div>
                                    </div>

                                    <div className="border border-gray-200 rounded-lg p-4">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-sm font-medium text-gray-700">المنظفات</span>
                                            <span className={`text-sm font-bold ${getPerformanceColor(currentMonth.targets.cleaning.percentage)}`}>
                                                {currentMonth.targets.cleaning.percentage}%
                                            </span>
                                        </div>
                                        <div className="flex justify-between text-xs text-gray-600 mb-2">
                                            <span>الهدف: {formatNumber(currentMonth.targets.cleaning.target)}</span>
                                            <span>المحقق: {formatNumber(currentMonth.targets.cleaning.achieved)}</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-3">
                                            <div
                                                className={`h-3 rounded-full ${
                                                    currentMonth.targets.cleaning.percentage >= 100 ? 'bg-green-500' :
                                                    currentMonth.targets.cleaning.percentage >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                                                }`}
                                                style={{ width: `${Math.min(100, currentMonth.targets.cleaning.percentage)}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'suppliers' && (
                    <div className="space-y-6">
                        {/* Supplier Performance Chart */}
                        <div className="bg-white rounded-xl border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">أداء المبيعات حسب الموردين</h3>
                            <div style={{ height: '300px' }}>
                                <Bar data={supplierPerformanceData} options={chartOptions} />
                            </div>
                        </div>

                        {/* Supplier Details */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {Object.entries(representative.supplierSales).map(([supplier, data]) => (
                                <div key={supplier} className="bg-white rounded-xl border border-gray-200 p-6">
                                    <h4 className="font-medium text-gray-900 mb-3">{supplier}</h4>
                                    <div className="space-y-3">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">الفئة:</span>
                                            <span className="font-medium text-purple-600">{data.category}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">الهدف:</span>
                                            <span className="font-bold">{formatNumber(data.target)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">المحقق:</span>
                                            <span className="font-bold text-green-600">{formatNumber(data.achieved)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">الباقي:</span>
                                            <span className="font-bold text-red-600">{formatNumber(data.remaining)}</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-3 mt-3">
                                            <div
                                                className="bg-blue-500 h-3 rounded-full"
                                                style={{ width: `${(data.achieved / data.target) * 100}%` }}
                                            ></div>
                                        </div>
                                        <div className="text-center text-xs text-gray-500 mt-1">
                                            {((data.achieved / data.target) * 100).toFixed(1)}% مكتمل
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'financial' && (
                    <div className="space-y-6">
                        {/* Salary Calculation */}
                        <div className="bg-white rounded-xl border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">تفصيل الراتب والحوافز</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-blue-50 rounded-lg p-4">
                                    <h4 className="font-medium text-blue-900 mb-2">الراتب الأساسي</h4>
                                    <div className="text-2xl font-bold text-blue-600">{formatCurrency(representative.baseSalary)}</div>
                                    <div className="text-sm text-gray-600">راتب ثابت شهري</div>
                                </div>

                                <div className="bg-green-50 rounded-lg p-4">
                                    <h4 className="font-medium text-green-900 mb-2">الحافز المحسوب</h4>
                                    <div className="text-2xl font-bold text-green-600">{formatCurrency(285000)}</div>
                                    <div className="text-sm text-gray-600">حسب نظام الأهداف</div>
                                </div>

                                <div className="bg-purple-50 rounded-lg p-4">
                                    <h4 className="font-medium text-purple-900 mb-2">الإجمالي</h4>
                                    <div className="text-2xl font-bold text-purple-600">{formatCurrency(representative.baseSalary + 285000)}</div>
                                    <div className="text-sm text-gray-600">الراتب النهائي</div>
                                </div>
                            </div>
                        </div>

                        {/* Financial Details */}
                        <div className="bg-white rounded-xl border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">التفاصيل المالية الشاملة</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <h4 className="font-medium text-gray-900 mb-3">المبيعات والتحصيل</h4>
                                    <div className="space-y-3">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">إجمالي المبيعات:</span>
                                            <span className="font-bold">{formatCurrency(currentMonth.salesAmount)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">البضاعة المرتجعة:</span>
                                            <span className="text-red-600">{formatCurrency(currentMonth.returnedGoods)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm border-t pt-2">
                                            <span className="text-gray-900 font-medium">صافي المبيعات:</span>
                                            <span className="font-bold text-green-600">
                                                {formatCurrency(currentMonth.salesAmount - currentMonth.returnedGoods)}
                                            </span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">النقد المحصل:</span>
                                            <span className="font-bold text-blue-600">{formatCurrency(currentMonth.cashCollected)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">المتبقي (ديون):</span>
                                            <span className="text-orange-600">{formatCurrency(currentMonth.clientsDebt)}</span>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-medium text-gray-900 mb-3">الأرباح والحوافز</h4>
                                    <div className="space-y-3">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">الربح المحقق:</span>
                                            <span className="font-bold text-green-600">{formatCurrency(currentMonth.profit)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">نسبة الربح:</span>
                                            <span className="font-medium">{((currentMonth.profit / currentMonth.salesAmount) * 100).toFixed(1)}%</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">عدد الفواتير:</span>
                                            <span className="font-medium">{formatNumber(currentMonth.invoicesCount)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">متوسط الفاتورة:</span>
                                            <span className="font-medium">
                                                {formatCurrency(currentMonth.salesAmount / currentMonth.invoicesCount)}
                                            </span>
                                        </div>
                                        <div className="flex justify-between text-sm border-t pt-2">
                                            <span className="text-gray-900 font-medium">كفاءة التحصيل:</span>
                                            <span className="font-bold text-green-600">
                                                {((currentMonth.cashCollected / currentMonth.salesAmount) * 100).toFixed(1)}%
                                            </span>
                                        </div>
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
