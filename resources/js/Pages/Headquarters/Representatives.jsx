import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
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

export default function Representatives() {
    const [activeTab, setActiveTab] = useState('overview');
    const [selectedRep, setSelectedRep] = useState(null);
    const [showRepDetails, setShowRepDetails] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState('2025-08');
    const [commissionType, setCommissionType] = useState('targets'); // targets, boxes, profit

    // Handle Escape key to close modal
    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === 'Escape' && showRepDetails) {
                setShowRepDetails(false);
                setSelectedRep(null);
            }
        };

        if (showRepDetails) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [showRepDetails]);

    // Mock data for representatives
    const representatives = [
        {
            id: 1,
            name: 'أحمد محمد علي',
            phone: '07701234567',
            email: 'ahmed@example.com',
            area: 'منطقة الكرادة',
            hireDate: '2023-01-15',
            baseSalary: 1000000, // مليون دينار
            commissionPlan: 'targets', // targets, boxes, profit
            isActive: true,
            performance: {
                currentMonth: {
                    salesAmount: 15800000,
                    returnedGoods: 420000,
                    totalBoxes: 320,
                    cashCollected: 14200000,
                    invoicesCount: 45,
                    clientsDebt: 1600000,
                    profit: 1580000
                },
                targets: {
                    food: { target: 1500, achieved: 1355, percentage: 90.3 },
                    cleaning: { target: 1200, achieved: 980, percentage: 81.7 },
                    suppliers: {
                        'شركة جيهان': { target: 3000, achieved: 2000, remaining: 1000, category: 'غذائية' },
                        'شركة الروان': { target: 4000, achieved: 2000, remaining: 2000, category: 'منظفات' },
                        'شركة سدرة العائلة': { target: 2500, achieved: 1800, remaining: 700, category: 'مختلطة' }
                    }
                },
                commission: {
                    type: 'targets',
                    amount: 285000,
                    percentage: 87.5, // نسبة تحقيق الهدف الإجمالية
                    details: {
                        targetBonus: 200000,
                        overAchievement: 85000
                    }
                }
            }
        },
        {
            id: 2,
            name: 'فاطمة حسن قاسم',
            phone: '07709876543',
            email: 'fatima@example.com',
            area: 'منطقة الجادرية',
            hireDate: '2023-03-20',
            baseSalary: 1000000,
            commissionPlan: 'boxes',
            isActive: true,
            performance: {
                currentMonth: {
                    salesAmount: 18200000,
                    returnedGoods: 280000,
                    totalBoxes: 450,
                    cashCollected: 16800000,
                    invoicesCount: 52,
                    clientsDebt: 1400000,
                    profit: 1820000
                },
                targets: {
                    boxes: { target: 400, achieved: 450, percentage: 112.5 }
                },
                commission: {
                    type: 'boxes',
                    amount: 135000, // 450 * 300 = 135,000
                    percentage: 112.5,
                    details: {
                        boxesCommission: 135000,
                        pricePerBox: 300
                    }
                }
            }
        },
        {
            id: 3,
            name: 'محمد صالح إبراهيم',
            phone: '07705555444',
            email: 'mohammed@example.com',
            area: 'منطقة الدورة',
            hireDate: '2023-05-10',
            baseSalary: 1000000,
            commissionPlan: 'profit',
            isActive: true,
            performance: {
                currentMonth: {
                    salesAmount: 12500000,
                    returnedGoods: 350000,
                    totalBoxes: 280,
                    cashCollected: 11200000,
                    invoicesCount: 38,
                    clientsDebt: 1300000,
                    profit: 1250000
                },
                commission: {
                    type: 'profit',
                    amount: 250000, // 20% من الربح
                    percentage: 20,
                    details: {
                        profitShare: 250000,
                        profitPercentage: 20
                    }
                }
            }
        },
        {
            id: 4,
            name: 'زينب عباس محمد',
            phone: '07703333222',
            email: 'zainab@example.com',
            area: 'منطقة الشعلة',
            hireDate: '2023-07-01',
            baseSalary: 1000000,
            commissionPlan: 'targets',
            isActive: false,
            performance: {
                currentMonth: {
                    salesAmount: 8900000,
                    returnedGoods: 180000,
                    totalBoxes: 190,
                    cashCollected: 8200000,
                    invoicesCount: 28,
                    clientsDebt: 700000,
                    profit: 890000
                },
                targets: {
                    food: { target: 1200, achieved: 680, percentage: 56.7 },
                    cleaning: { target: 800, achieved: 520, percentage: 65.0 }
                },
                commission: {
                    type: 'targets',
                    amount: 89000, // راتب مخفض بسبب عدم تحقيق الهدف
                    percentage: 61.2,
                    details: {
                        targetBonus: 89000,
                        penalty: -150000 // خصم بسبب عدم تحقيق 80%
                    }
                }
            }
        }
    ];

    // Performance data for charts
    const monthlyPerformanceData = {
        labels: ['Mar 2025', 'Apr 2025', 'May 2025', 'Jun 2025', 'Jul 2025', 'Aug 2025'],
        datasets: [
            {
                label: 'Total Sales',
                data: [48000000, 52000000, 58000000, 55000000, 61000000, 65000000],
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.1
            }
        ]
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

    const getStatusColor = (isActive) => {
        return isActive ? 'bg-green-100 text-green-800 border-green-200' : 'bg-red-100 text-red-800 border-red-200';
    };

    const getPerformanceColor = (percentage) => {
        if (percentage >= 100) return 'text-green-600';
        if (percentage >= 80) return 'text-yellow-600';
        return 'text-red-600';
    };

    const calculateTotalSalary = (rep) => {
        return rep.baseSalary + rep.performance.commission.amount;
    };

    const calculateEfficiencyRate = (rep) => {
        const { salesAmount, returnedGoods } = rep.performance.currentMonth;
        return ((salesAmount - returnedGoods) / salesAmount * 100);
    };

    // Statistics
    const stats = {
        totalReps: representatives.length,
        activeReps: representatives.filter(rep => rep.isActive).length,
        totalSales: representatives.reduce((sum, rep) => sum + rep.performance.currentMonth.salesAmount, 0),
        totalCommissions: representatives.reduce((sum, rep) => sum + rep.performance.commission.amount, 0),
        averagePerformance: representatives.reduce((sum, rep) => {
            if (rep.performance.commission.type === 'targets') {
                return sum + rep.performance.commission.percentage;
            } else if (rep.performance.commission.type === 'boxes') {
                return sum + rep.performance.commission.percentage;
            }
            return sum + 85; // default for profit type
        }, 0) / representatives.length
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

    return (
        <HeadquartersLayout>
            <Head title="إدارة المندوبين" />

            <div className="p-6 space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">إدارة المندوبين</h1>
                        <p className="text-gray-600">إدارة شاملة للمندوبين والرواتب والحوافز</p>
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
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
                            إضافة مندوب جديد
                        </button>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                    <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-2xl font-bold text-blue-600">{formatNumber(stats.totalReps)}</div>
                                <div className="text-sm text-gray-600">إجمالي المندوبين</div>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-2xl font-bold text-green-600">{formatNumber(stats.activeReps)}</div>
                                <div className="text-sm text-gray-600">المندوبين النشطين</div>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-2xl font-bold text-purple-600">{formatCurrency(stats.totalSales)}</div>
                                <div className="text-sm text-gray-600">إجمالي المبيعات</div>
                            </div>
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-2xl font-bold text-orange-600">{formatCurrency(stats.totalCommissions)}</div>
                                <div className="text-sm text-gray-600">إجمالي الحوافز</div>
                            </div>
                            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-2xl font-bold text-yellow-600">{stats.averagePerformance.toFixed(1)}%</div>
                                <div className="text-sm text-gray-600">متوسط الأداء</div>
                            </div>
                            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
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
                            { id: 'performance', name: 'الأداء والرواتب', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
                            { id: 'targets', name: 'الأهداف والحوافز', icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z' },
                            { id: 'reports', name: 'التقارير التفصيلية', icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' }
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
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Performance Chart */}
                        <div className="bg-white rounded-xl border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">أداء المبيعات - آخر 6 أشهر</h3>
                            <div style={{ height: '300px' }}>
                                <Line data={monthlyPerformanceData} options={chartOptions} />
                            </div>
                        </div>

                        {/* Top Performers */}
                        <div className="bg-white rounded-xl border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">أفضل المندوبين هذا الشهر</h3>
                            <div className="space-y-4">
                                {representatives
                                    .sort((a, b) => b.performance.currentMonth.salesAmount - a.performance.currentMonth.salesAmount)
                                    .slice(0, 3)
                                    .map((rep, index) => (
                                    <div key={rep.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                        <div className="flex items-center space-x-3 space-x-reverse">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                                                index === 0 ? 'bg-yellow-500' :
                                                index === 1 ? 'bg-gray-400' : 'bg-amber-600'
                                            }`}>
                                                {index + 1}
                                            </div>
                                            <div>
                                                <div className="font-medium text-gray-900">{rep.name}</div>
                                                <div className="text-sm text-gray-500">{rep.area}</div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-bold text-green-600">{formatCurrency(rep.performance.currentMonth.salesAmount)}</div>
                                            <div className="text-sm text-gray-500">{formatNumber(rep.performance.currentMonth.totalBoxes)} كرتون</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'performance' && (
                    <div className="space-y-6">
                        {/* Representatives Table */}
                        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-900">جدول الأداء والرواتب</h3>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">المندوب</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">المبيعات</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الكراتين</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">نسبة الأداء</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الراتب الأساسي</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الحافز</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الإجمالي</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الحالة</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">العمليات</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {representatives.map((rep) => (
                                            <tr key={rep.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4">
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900">{rep.name}</div>
                                                        <div className="text-sm text-gray-500">{rep.area}</div>
                                                        <div className="text-xs text-gray-400">{rep.phone}</div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm text-gray-900">{formatCurrency(rep.performance.currentMonth.salesAmount)}</div>
                                                    <div className="text-xs text-gray-500">المرتجع: {formatCurrency(rep.performance.currentMonth.returnedGoods)}</div>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-900">{formatNumber(rep.performance.currentMonth.totalBoxes)}</td>
                                                <td className="px-6 py-4">
                                                    <div className={`text-sm font-medium ${getPerformanceColor(rep.performance.commission.percentage)}`}>
                                                        {rep.performance.commission.percentage.toFixed(1)}%
                                                    </div>
                                                    <div className="w-16 bg-gray-200 rounded-full h-2 mt-1">
                                                        <div
                                                            className={`h-2 rounded-full ${
                                                                rep.performance.commission.percentage >= 100 ? 'bg-green-600' :
                                                                rep.performance.commission.percentage >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                                                            }`}
                                                            style={{ width: `${Math.min(100, rep.performance.commission.percentage)}%` }}
                                                        ></div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-900">{formatCurrency(rep.baseSalary)}</td>
                                                <td className="px-6 py-4">
                                                    <div className={`text-sm font-medium ${rep.performance.commission.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                        {formatCurrency(rep.performance.commission.amount)}
                                                    </div>
                                                    <div className="text-xs text-gray-500">{rep.commissionPlan}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm font-bold text-gray-900">{formatCurrency(calculateTotalSalary(rep))}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(rep.isActive)}`}>
                                                        {rep.isActive ? 'نشط' : 'غير نشط'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <button
                                                        onClick={() => {
                                                            setSelectedRep(rep);
                                                            setShowRepDetails(true);
                                                        }}
                                                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                                    >
                                                        التفاصيل الكاملة
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'targets' && (
                    <div className="space-y-6">
                        {/* Commission Type Selector */}
                        <div className="bg-white rounded-xl border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">إدارة أنظمة الحوافز</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Targets Plan */}
                                <div className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${
                                    commissionType === 'targets' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white hover:border-gray-300'
                                }`} onClick={() => setCommissionType('targets')}>
                                    <div className="flex items-center space-x-3 space-x-reverse mb-4">
                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                            commissionType === 'targets' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
                                        }`}>
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                            </svg>
                                        </div>
                                        <h4 className="font-semibold">الخطة الأولى: الأهداف المحددة</h4>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-3">
                                        تحديد أهداف حسب نوع المنتج والشركة الموردة لتشجيع بيع جميع الأصناف
                                    </p>
                                    <ul className="text-xs text-gray-500 space-y-1">
                                        <li>• أهداف بحسب فئة المنتجات (غذائية، منظفات)</li>
                                        <li>• أهداف خاصة بكل مورد</li>
                                        <li>• حوافز للتجاوز + خصومات للنقص</li>
                                    </ul>
                                </div>

                                {/* Boxes Plan */}
                                <div className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${
                                    commissionType === 'boxes' ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-white hover:border-gray-300'
                                }`} onClick={() => setCommissionType('boxes')}>
                                    <div className="flex items-center space-x-3 space-x-reverse mb-4">
                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                            commissionType === 'boxes' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-600'
                                        }`}>
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                            </svg>
                                        </div>
                                        <h4 className="font-semibold">الخطة الثانية: عمولة الكراتين</h4>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-3">
                                        هدف كلي لعدد الكراتين مع عمولة ثابتة لكل كرتون
                                    </p>
                                    <ul className="text-xs text-gray-500 space-y-1">
                                        <li>• 300 دينار لكل كرتون مباع</li>
                                        <li>• هدف شهري: 6000 كرتون</li>
                                        <li>• حساب تلقائي للاستحقاق</li>
                                    </ul>
                                </div>

                                {/* Profit Plan */}
                                <div className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${
                                    commissionType === 'profit' ? 'border-purple-500 bg-purple-50' : 'border-gray-200 bg-white hover:border-gray-300'
                                }`} onClick={() => setCommissionType('profit')}>
                                    <div className="flex items-center space-x-3 space-x-reverse mb-4">
                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                            commissionType === 'profit' ? 'bg-purple-500 text-white' : 'bg-gray-100 text-gray-600'
                                        }`}>
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <h4 className="font-semibold">الخطة الثالثة: عمولة الربح</h4>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-3">
                                        نسبة مئوية من الربح المحقق من مبيعات المندوب
                                    </p>
                                    <ul className="text-xs text-gray-500 space-y-1">
                                        <li>• 20% من صافي الربح</li>
                                        <li>• تشجيع على زيادة المبيعات</li>
                                        <li>• حساب حسب الفرق بين البيع والشراء</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Targets Configuration */}
                        {commissionType === 'targets' && (
                            <div className="bg-white rounded-xl border border-gray-200 p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">إعداد الأهداف حسب الفئات والموردين</h3>

                                {/* Category Targets */}
                                <div className="mb-6">
                                    <h4 className="font-medium text-gray-900 mb-3">الأهداف حسب فئات المنتجات</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="border border-gray-200 rounded-lg p-4">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">المواد الغذائية</label>
                                            <input
                                                type="number"
                                                placeholder="الهدف الشهري (قطعة)"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                defaultValue="1500"
                                            />
                                        </div>
                                        <div className="border border-gray-200 rounded-lg p-4">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">المنظفات</label>
                                            <input
                                                type="number"
                                                placeholder="الهدف الشهري (قطعة)"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                defaultValue="1200"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Supplier Targets */}
                                <div className="mb-6">
                                    <h4 className="font-medium text-gray-900 mb-3">الأهداف حسب الموردين</h4>
                                    <div className="space-y-4">
                                        {[
                                            { name: 'شركة جيهان', category: 'غذائية', target: 3000 },
                                            { name: 'شركة الروان', category: 'منظفات', target: 4000 },
                                            { name: 'شركة سدرة العائلة', category: 'مختلطة', target: 2500 }
                                        ].map((supplier, index) => (
                                            <div key={index} className="border border-gray-200 rounded-lg p-4">
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">اسم المورد</label>
                                                        <input
                                                            type="text"
                                                            value={supplier.name}
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                            readOnly
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">فئة المنتجات</label>
                                                        <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                                                            <option value="غذائية">غذائية</option>
                                                            <option value="منظفات">منظفات</option>
                                                            <option value="مختلطة">مختلطة</option>
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">الهدف الشهري</label>
                                                        <input
                                                            type="number"
                                                            defaultValue={supplier.target}
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Performance Rates */}
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <h4 className="font-medium text-gray-900 mb-3">إعدادات نسب الأداء</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">الحد الأدنى للراتب الكامل</label>
                                            <div className="flex items-center">
                                                <input
                                                    type="number"
                                                    defaultValue="80"
                                                    min="0"
                                                    max="100"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                                <span className="ml-2 text-gray-500">%</span>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">نسبة حافز التجاوز</label>
                                            <div className="flex items-center">
                                                <input
                                                    type="number"
                                                    defaultValue="10"
                                                    min="0"
                                                    max="50"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                                <span className="ml-2 text-gray-500">%</span>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">نسبة خصم النقص</label>
                                            <div className="flex items-center">
                                                <input
                                                    type="number"
                                                    defaultValue="15"
                                                    min="0"
                                                    max="50"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                                <span className="ml-2 text-gray-500">%</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end mt-6">
                                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium">
                                        حفظ إعدادات الأهداف
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Boxes Configuration */}
                        {commissionType === 'boxes' && (
                            <div className="bg-white rounded-xl border border-gray-200 p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">إعداد نظام عمولة الكراتين</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">الهدف الشهري للكراتين</label>
                                        <input
                                            type="number"
                                            defaultValue="6000"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                        />
                                        <p className="text-xs text-gray-500 mt-1">عدد الكراتين المطلوب بيعها شهرياً</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">العمولة لكل كرتون</label>
                                        <div className="flex items-center">
                                            <input
                                                type="number"
                                                defaultValue="300"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                            />
                                            <span className="ml-2 text-gray-500">د.ع</span>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">المبلغ المدفوع لكل كرتون مباع</p>
                                    </div>
                                </div>

                                <div className="bg-green-50 rounded-lg p-4 mt-6">
                                    <h4 className="font-medium text-green-900 mb-2">حساب العمولة المتوقعة</h4>
                                    <div className="text-sm text-green-700">
                                        <p>إذا باع المندوب 6000 كرتون × 300 د.ع = <span className="font-bold">1,800,000 د.ع</span> شهرياً</p>
                                        <p>الراتب الإجمالي: 1,000,000 (راتب أساسي) + 1,800,000 (عمولة) = <span className="font-bold">2,800,000 د.ع</span></p>
                                    </div>
                                </div>

                                <div className="flex justify-end mt-6">
                                    <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium">
                                        حفظ إعدادات الكراتين
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Profit Configuration */}
                        {commissionType === 'profit' && (
                            <div className="bg-white rounded-xl border border-gray-200 p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">إعداد نظام عمولة الربح</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">نسبة العمولة من الربح</label>
                                        <div className="flex items-center">
                                            <input
                                                type="number"
                                                defaultValue="20"
                                                min="5"
                                                max="50"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                            />
                                            <span className="ml-2 text-gray-500">%</span>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">نسبة المندوب من صافي الربح</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">الحد الأدنى للربح</label>
                                        <div className="flex items-center">
                                            <input
                                                type="number"
                                                defaultValue="100"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                            />
                                            <span className="ml-2 text-gray-500">د.ع</span>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">أقل ربح لكل منتج لحساب العمولة</p>
                                    </div>
                                </div>

                                <div className="bg-purple-50 rounded-lg p-4 mt-6">
                                    <h4 className="font-medium text-purple-900 mb-2">مثال على حساب العمولة</h4>
                                    <div className="text-sm text-purple-700">
                                        <p>المنتج: سعر الشراء 1000 د.ع، سعر البيع 1100 د.ع</p>
                                        <p>الربح: 100 د.ع × 20% = <span className="font-bold">20 د.ع</span> عمولة للمندوب</p>
                                        <p>لو باع 1000 قطعة في الشهر: 1000 × 20 = <span className="font-bold">20,000 د.ع</span> عمولة إضافية</p>
                                    </div>
                                </div>

                                <div className="flex justify-end mt-6">
                                    <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium">
                                        حفظ إعدادات الربح
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'reports' && (
                    <div className="space-y-6">
                        {/* Reports Overview */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-2xl font-bold text-blue-600">{formatCurrency(stats.totalSales)}</div>
                                        <div className="text-sm text-gray-600">إجمالي مبيعات الشهر</div>
                                    </div>
                                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-red-50 rounded-xl p-6 border border-red-200">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-2xl font-bold text-red-600">{formatCurrency(1230000)}</div>
                                        <div className="text-sm text-gray-600">البضاعة المرتجعة</div>
                                    </div>
                                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                                        <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m5 14-3-3m3 3l-3 3" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-2xl font-bold text-green-600">{formatCurrency(51000000)}</div>
                                        <div className="text-sm text-gray-600">النقد المحصل</div>
                                    </div>
                                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-2xl font-bold text-orange-600">{formatCurrency(5000000)}</div>
                                        <div className="text-sm text-gray-600">مجموع الديون</div>
                                    </div>
                                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                                        <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Detailed Reports Table */}
                        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-900">التقرير التفصيلي للمندوبين</h3>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">المندوب</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">المبيعات</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">المرتجعات</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الكراتين</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">النقد المحصل</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الفواتير</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الديون</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الربح</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الكفاءة</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {representatives.map((rep) => (
                                            <tr key={rep.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4">
                                                    <div className="text-sm font-medium text-gray-900">{rep.name}</div>
                                                    <div className="text-sm text-gray-500">{rep.area}</div>
                                                </td>
                                                <td className="px-6 py-4 text-sm font-medium text-green-600">
                                                    {formatCurrency(rep.performance.currentMonth.salesAmount)}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-red-600">
                                                    {formatCurrency(rep.performance.currentMonth.returnedGoods)}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-900">
                                                    {formatNumber(rep.performance.currentMonth.totalBoxes)}
                                                </td>
                                                <td className="px-6 py-4 text-sm font-medium text-blue-600">
                                                    {formatCurrency(rep.performance.currentMonth.cashCollected)}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-900">
                                                    {formatNumber(rep.performance.currentMonth.invoicesCount)}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-orange-600">
                                                    {formatCurrency(rep.performance.currentMonth.clientsDebt)}
                                                </td>
                                                <td className="px-6 py-4 text-sm font-medium text-green-600">
                                                    {formatCurrency(rep.performance.currentMonth.profit)}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {calculateEfficiencyRate(rep).toFixed(1)}%
                                                        </div>
                                                        <div className="ml-2 w-16 bg-gray-200 rounded-full h-2">
                                                            <div
                                                                className={`h-2 rounded-full ${
                                                                    calculateEfficiencyRate(rep) >= 95 ? 'bg-green-500' :
                                                                    calculateEfficiencyRate(rep) >= 90 ? 'bg-yellow-500' : 'bg-red-500'
                                                                }`}
                                                                style={{ width: `${calculateEfficiencyRate(rep)}%` }}
                                                            ></div>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Product Sales by Representative */}
                        <div className="bg-white rounded-xl border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">تحليل المبيعات حسب فئات المنتجات</h3>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {representatives.slice(0, 2).map((rep) => (
                                    <div key={rep.id} className="border border-gray-200 rounded-lg p-4">
                                        <h4 className="font-medium text-gray-900 mb-3">{rep.name}</h4>
                                        {rep.performance.targets && rep.performance.targets.food && (
                                            <div className="space-y-3">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm text-gray-600">المواد الغذائية:</span>
                                                    <div className="text-right">
                                                        <div className="text-sm font-medium">{formatNumber(rep.performance.targets.food.achieved)} / {formatNumber(rep.performance.targets.food.target)}</div>
                                                        <div className={`text-xs ${getPerformanceColor(rep.performance.targets.food.percentage)}`}>
                                                            {rep.performance.targets.food.percentage}%
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm text-gray-600">المنظفات:</span>
                                                    <div className="text-right">
                                                        <div className="text-sm font-medium">{formatNumber(rep.performance.targets.cleaning.achieved)} / {formatNumber(rep.performance.targets.cleaning.target)}</div>
                                                        <div className={`text-xs ${getPerformanceColor(rep.performance.targets.cleaning.percentage)}`}>
                                                            {rep.performance.targets.cleaning.percentage}%
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Export Options */}
                        <div className="bg-gray-50 rounded-xl p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">تصدير التقارير</h3>
                            <div className="flex flex-wrap gap-3">
                                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
                                    تصدير Excel
                                </button>
                                <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
                                    تصدير PDF
                                </button>
                                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
                                    إرسال تقرير شهري
                                </button>
                                <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
                                    طباعة كشف الرواتب
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                {showRepDetails && selectedRep && (
                    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                            <div
                                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                                aria-hidden="true"
                                onClick={() => {
                                    setShowRepDetails(false);
                                    setSelectedRep(null);
                                }}
                            ></div>

                            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                            <div className="relative inline-block align-bottom bg-white rounded-lg text-right overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-6xl sm:w-full">
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                                            تفاصيل المندوب - {selectedRep.name}
                                        </h3>
                                        <button
                                            onClick={() => {
                                                setShowRepDetails(false);
                                                setSelectedRep(null);
                                            }}
                                            className="text-gray-400 hover:text-gray-600"
                                        >
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>

                                    {/* Representative Info Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                                        {/* Personal Info */}
                                        <div className="bg-gray-50 rounded-lg p-4">
                                            <h4 className="font-medium text-gray-900 mb-3">المعلومات الشخصية</h4>
                                            <div className="space-y-2 text-sm">
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">الهاتف:</span>
                                                    <span className="font-mono">{selectedRep.phone}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">البريد:</span>
                                                    <span>{selectedRep.email}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">المنطقة:</span>
                                                    <span>{selectedRep.area}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">تاريخ التوظيف:</span>
                                                    <span>{formatDate(selectedRep.hireDate)}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Sales Performance */}
                                        <div className="bg-blue-50 rounded-lg p-4">
                                            <h4 className="font-medium text-gray-900 mb-3">أداء المبيعات</h4>
                                            <div className="space-y-2 text-sm">
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">إجمالي المبيعات:</span>
                                                    <span className="font-bold text-blue-600">{formatCurrency(selectedRep.performance.currentMonth.salesAmount)}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">البضاعة المرتجعة:</span>
                                                    <span className="text-red-600">{formatCurrency(selectedRep.performance.currentMonth.returnedGoods)}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">صافي المبيعات:</span>
                                                    <span className="font-bold">{formatCurrency(selectedRep.performance.currentMonth.salesAmount - selectedRep.performance.currentMonth.returnedGoods)}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">الكفاءة:</span>
                                                    <span className="font-medium text-green-600">{calculateEfficiencyRate(selectedRep).toFixed(1)}%</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Financial Info */}
                                        <div className="bg-green-50 rounded-lg p-4">
                                            <h4 className="font-medium text-gray-900 mb-3">المعلومات المالية</h4>
                                            <div className="space-y-2 text-sm">
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">النقد المحصل:</span>
                                                    <span className="font-bold text-green-600">{formatCurrency(selectedRep.performance.currentMonth.cashCollected)}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">ديون العملاء:</span>
                                                    <span className="text-orange-600">{formatCurrency(selectedRep.performance.currentMonth.clientsDebt)}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">عدد الفواتير:</span>
                                                    <span>{formatNumber(selectedRep.performance.currentMonth.invoicesCount)}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">الربح المحقق:</span>
                                                    <span className="font-bold text-green-600">{formatCurrency(selectedRep.performance.currentMonth.profit)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Commission Details */}
                                    {selectedRep.performance.commission.type === 'targets' && selectedRep.performance.targets && (
                                        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
                                            <h4 className="font-medium text-gray-900 mb-4">تفاصيل الأهداف والحوافز</h4>

                                            {/* Category Targets */}
                                            {selectedRep.performance.targets.food && (
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                                    <div className="bg-orange-50 rounded-lg p-4">
                                                        <h5 className="font-medium text-orange-900 mb-3">المواد الغذائية</h5>
                                                        <div className="space-y-2">
                                                            <div className="flex justify-between text-sm">
                                                                <span>الهدف:</span>
                                                                <span className="font-bold">{formatNumber(selectedRep.performance.targets.food.target)}</span>
                                                            </div>
                                                            <div className="flex justify-between text-sm">
                                                                <span>المحقق:</span>
                                                                <span className="font-bold text-green-600">{formatNumber(selectedRep.performance.targets.food.achieved)}</span>
                                                            </div>
                                                            <div className="flex justify-between text-sm">
                                                                <span>النسبة:</span>
                                                                <span className={`font-bold ${getPerformanceColor(selectedRep.performance.targets.food.percentage)}`}>
                                                                    {selectedRep.performance.targets.food.percentage}%
                                                                </span>
                                                            </div>
                                                            <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
                                                                <div
                                                                    className={`h-3 rounded-full ${
                                                                        selectedRep.performance.targets.food.percentage >= 100 ? 'bg-green-500' :
                                                                        selectedRep.performance.targets.food.percentage >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                                                                    }`}
                                                                    style={{ width: `${Math.min(100, selectedRep.performance.targets.food.percentage)}%` }}
                                                                ></div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="bg-blue-50 rounded-lg p-4">
                                                        <h5 className="font-medium text-blue-900 mb-3">المنظفات</h5>
                                                        <div className="space-y-2">
                                                            <div className="flex justify-between text-sm">
                                                                <span>الهدف:</span>
                                                                <span className="font-bold">{formatNumber(selectedRep.performance.targets.cleaning.target)}</span>
                                                            </div>
                                                            <div className="flex justify-between text-sm">
                                                                <span>المحقق:</span>
                                                                <span className="font-bold text-green-600">{formatNumber(selectedRep.performance.targets.cleaning.achieved)}</span>
                                                            </div>
                                                            <div className="flex justify-between text-sm">
                                                                <span>النسبة:</span>
                                                                <span className={`font-bold ${getPerformanceColor(selectedRep.performance.targets.cleaning.percentage)}`}>
                                                                    {selectedRep.performance.targets.cleaning.percentage}%
                                                                </span>
                                                            </div>
                                                            <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
                                                                <div
                                                                    className={`h-3 rounded-full ${
                                                                        selectedRep.performance.targets.cleaning.percentage >= 100 ? 'bg-green-500' :
                                                                        selectedRep.performance.targets.cleaning.percentage >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                                                                    }`}
                                                                    style={{ width: `${Math.min(100, selectedRep.performance.targets.cleaning.percentage)}%` }}
                                                                ></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Supplier Targets */}
                                            {selectedRep.performance.targets.suppliers && (
                                                <div>
                                                    <h5 className="font-medium text-gray-900 mb-3">أهداف الموردين</h5>
                                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                        {Object.entries(selectedRep.performance.targets.suppliers).map(([supplier, data]) => (
                                                            <div key={supplier} className="bg-gray-50 rounded-lg p-4">
                                                                <h6 className="font-medium text-gray-900 mb-2">{supplier}</h6>
                                                                <div className="space-y-1 text-sm">
                                                                    <div className="flex justify-between">
                                                                        <span>الفئة:</span>
                                                                        <span className="text-purple-600">{data.category}</span>
                                                                    </div>
                                                                    <div className="flex justify-between">
                                                                        <span>الهدف:</span>
                                                                        <span className="font-bold">{formatNumber(data.target)}</span>
                                                                    </div>
                                                                    <div className="flex justify-between">
                                                                        <span>المحقق:</span>
                                                                        <span className="font-bold text-green-600">{formatNumber(data.achieved)}</span>
                                                                    </div>
                                                                    <div className="flex justify-between">
                                                                        <span>الباقي:</span>
                                                                        <span className="font-bold text-red-600">{formatNumber(data.remaining)}</span>
                                                                    </div>
                                                                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                                                                        <div
                                                                            className="bg-blue-500 h-2 rounded-full"
                                                                            style={{ width: `${(data.achieved / data.target) * 100}%` }}
                                                                        ></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* Salary Breakdown */}
                                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                                        <h4 className="font-medium text-gray-900 mb-4">تفصيل الراتب والحوافز</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            <div className="bg-blue-50 rounded-lg p-4">
                                                <h5 className="font-medium text-blue-900 mb-2">الراتب الأساسي</h5>
                                                <div className="text-2xl font-bold text-blue-600">{formatCurrency(selectedRep.baseSalary)}</div>
                                                <div className="text-sm text-gray-600">راتب ثابت شهري</div>
                                            </div>

                                            <div className="bg-green-50 rounded-lg p-4">
                                                <h5 className="font-medium text-green-900 mb-2">الحافز</h5>
                                                <div className={`text-2xl font-bold ${selectedRep.performance.commission.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                    {formatCurrency(selectedRep.performance.commission.amount)}
                                                </div>
                                                <div className="text-sm text-gray-600">
                                                    {selectedRep.commissionPlan === 'targets' ? 'نظام الأهداف' :
                                                     selectedRep.commissionPlan === 'boxes' ? 'نظام الكراتين' : 'نظام الربح'}
                                                </div>
                                            </div>

                                            <div className="bg-purple-50 rounded-lg p-4">
                                                <h5 className="font-medium text-purple-900 mb-2">الإجمالي</h5>
                                                <div className="text-2xl font-bold text-purple-600">{formatCurrency(calculateTotalSalary(selectedRep))}</div>
                                                <div className="text-sm text-gray-600">الراتب النهائي</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowRepDetails(false);
                                            setSelectedRep(null);
                                        }}
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm transition-colors duration-200"
                                    >
                                        إغلاق
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </HeadquartersLayout>
    );
}
