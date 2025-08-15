import React, { useState } from 'react';
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

export default function SupplierDetails({ supplierId }) {
    const [activeTab, setActiveTab] = useState('overview');
    const [trackingPeriod, setTrackingPeriod] = useState('month'); // week, month, quarter, year
    const [selectedProduct, setSelectedProduct] = useState('all'); // all or specific product
    const [dateRange, setDateRange] = useState({
        startDate: '2025-07-01',
        endDate: '2025-08-15'
    });

    // Mock data - in real app, this would come from props or API
    const supplier = {
        id: supplierId || 1,
        name: 'شركة سدرة العائلة',
        contact: 'أحمد محمد',
        phone: '07701234567',
        email: 'ahmed@sadra.iq',
        address: 'بغداد - الكرادة - شارع الأطباء',
        categories: ['منظفات', 'مواد غذائية'],
        rating: 4.5,
        totalProducts: 45,
        totalSales: 25800000,
        lastOrder: '2025-08-10',
        status: 'نشط',
        cleaningProducts: 20,
        foodProducts: 25,
        establishedDate: '2018-03-15',
        contractDate: '2020-01-10',
        performance: {
            currentMonth: 3200000,
            lastMonth: 2800000,
            trend: 'up',
            averageOrderValue: 580000,
            onTimeDelivery: 92,
            qualityRating: 4.5
        }
    };

    // Historical performance data (6 months)
    const performanceData = [
        { month: 'فبراير 2025', sales: 2100000, orders: 45 },
        { month: 'مارس 2025', sales: 2400000, orders: 52 },
        { month: 'أبريل 2025', sales: 2800000, orders: 48 },
        { month: 'مايو 2025', sales: 3100000, orders: 55 },
        { month: 'يونيو 2025', sales: 2900000, orders: 51 },
        { month: 'يوليو 2025', sales: 3200000, orders: 58 }
    ];

    // Daily sales for current month
    const dailySalesData = [
        { date: '2025/8/13', value: 450000 },
        { date: '2025/8/14', value: 380000 },
        { date: '2025/8/15', value: 520000 },
        { date: '2025/8/16', value: 290000 },
        { date: '2025/8/17', value: 180000 },
        { date: '2025/8/18', value: 0 }
    ];

    // Products breakdown
    const products = {
        cleaning: [
            { name: 'تايد مسحوق غسيل', quantity: 120, sales: 2160000, trend: 'up', lastMonthSales: 1980000 },
            { name: 'زاهي صابون سائل', quantity: 85, sales: 850000, trend: 'down', lastMonthSales: 920000 },
            { name: 'معطر جو', quantity: 45, sales: 540000, trend: 'up', lastMonthSales: 480000 },
            { name: 'منظف أرضيات', quantity: 60, sales: 720000, trend: 'stable', lastMonthSales: 710000 }
        ],
        food: [
            { name: 'تمن عنبر درجة أولى', quantity: 200, sales: 5600000, trend: 'up', lastMonthSales: 5200000 },
            { name: 'معجون طماطم', quantity: 150, sales: 2100000, trend: 'up', lastMonthSales: 1950000 },
            { name: 'زيت طبخ', quantity: 80, sales: 2400000, trend: 'down', lastMonthSales: 2600000 },
            { name: 'سكر ناعم', quantity: 90, sales: 1350000, trend: 'stable', lastMonthSales: 1320000 }
        ]
    };

    // Tracking data for different periods
    const trackingData = {
        week: {
            labels: ['Aug 9', 'Aug 10', 'Aug 11', 'Aug 12', 'Aug 13', 'Aug 14', 'Aug 15'],
            all: [1200000, 1350000, 980000, 1450000, 1100000, 1380000, 1520000],
            'تايد مسحوق غسيل': [320000, 360000, 280000, 410000, 300000, 380000, 420000],
            'زاهي صابون سائل': [120000, 135000, 98000, 145000, 110000, 138000, 152000],
            'تمن عنبر درجة أولى': [450000, 480000, 350000, 520000, 400000, 480000, 540000],
            'معجون طماطم': [180000, 200000, 150000, 220000, 170000, 200000, 230000],
            'زيت طبخ': [130000, 145000, 102000, 155000, 120000, 145000, 160000]
        },
        month: {
            labels: ['Mar 2025', 'Apr 2025', 'May 2025', 'Jun 2025', 'Jul 2025', 'Aug 2025'],
            all: [2400000, 2800000, 3100000, 2900000, 3200000, 3450000],
            'تايد مسحوق غسيل': [480000, 560000, 620000, 580000, 640000, 690000],
            'زاهي صابون سائل': [360000, 420000, 465000, 435000, 480000, 515000],
            'تمن عنبر درجة أولى': [960000, 1120000, 1240000, 1160000, 1280000, 1380000],
            'معجون طماطم': [360000, 420000, 465000, 435000, 480000, 515000],
            'زيت طبخ': [240000, 280000, 310000, 290000, 320000, 345000]
        },
        quarter: {
            labels: ['Q4 2024', 'Q1 2025', 'Q2 2025', 'Q3 2025'],
            all: [6800000, 7200000, 8100000, 8900000],
            'تايد مسحوق غسيل': [1360000, 1440000, 1620000, 1780000],
            'زاهي صابون سائل': [1020000, 1080000, 1215000, 1335000],
            'تمن عنبر درجة أولى': [2720000, 2880000, 3240000, 3560000],
            'معجون طماطم': [1020000, 1080000, 1215000, 1335000],
            'زيت طبخ': [680000, 720000, 810000, 890000]
        },
        year: {
            labels: ['2021', '2022', '2023', '2024', '2025'],
            all: [18000000, 22000000, 26500000, 29800000, 32400000],
            'تايد مسحوق غسيل': [3600000, 4400000, 5300000, 5960000, 6480000],
            'زاهي صابون سائل': [2700000, 3300000, 3975000, 4470000, 4860000],
            'تمن عنبر درجة أولى': [7200000, 8800000, 10600000, 11920000, 12960000],
            'معجون طماطم': [2700000, 3300000, 3975000, 4470000, 4860000],
            'زيت طبخ': [1800000, 2200000, 2650000, 2980000, 3240000]
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US').format(amount) + ' د.ع';
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-GB', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const formatNumber = (number) => {
        return new Intl.NumberFormat('en-US').format(number);
    };

    const getTrendIcon = (trend) => {
        switch (trend) {
            case 'up':
                return <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                </svg>;
            case 'down':
                return <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                </svg>;
            default:
                return <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
                </svg>;
        }
    };

    const getTrendColor = (trend) => {
        switch (trend) {
            case 'up': return 'text-green-600';
            case 'down': return 'text-red-600';
            default: return 'text-gray-600';
        }
    };

    // Chart configurations
    const performanceChartOptions = {
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

    const categoryComparisonData = {
        labels: ['منظفات', 'مواد غذائية'],
        datasets: [{
            data: [
                products.cleaning.reduce((sum, p) => sum + p.sales, 0),
                products.food.reduce((sum, p) => sum + p.sales, 0)
            ],
            backgroundColor: ['#3b82f6', '#10b981'],
            borderWidth: 2,
            borderColor: '#ffffff'
        }]
    };

    return (
        <HeadquartersLayout>
            <Head title={`تفاصيل المورد - ${supplier.name}`} />

            <div className="p-6 space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 space-x-reverse">
                        <Link
                            href="/headquarters/suppliers"
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">{supplier.name}</h1>
                            <p className="text-gray-600">تفاصيل شاملة عن المورد وأدائه</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-3 space-x-reverse">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                            supplier.status === 'نشط' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                            {supplier.status}
                        </span>
                        <div className="flex items-center">
                            <div className="flex text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} className={`w-5 h-5 ${i < Math.floor(supplier.rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <span className="mr-2 text-sm text-gray-600">{supplier.rating}</span>
                        </div>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-2xl font-bold text-blue-600">{formatNumber(supplier.totalProducts)}</div>
                                <div className="text-sm text-gray-600">إجمالي المنتجات</div>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-2xl font-bold text-green-600">{formatCurrency(supplier.totalSales)}</div>
                                <div className="text-sm text-gray-600">إجمالي المبيعات</div>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-2xl font-bold text-purple-600">{formatNumber(supplier.performance.onTimeDelivery)}%</div>
                                <div className="text-sm text-gray-600">التسليم في الوقت المحدد</div>
                            </div>
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-2xl font-bold text-orange-600">{formatCurrency(supplier.performance.averageOrderValue)}</div>
                                <div className="text-sm text-gray-600">متوسط قيمة الطلب</div>
                            </div>
                            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                            { id: 'performance', name: 'تقييم الأداء', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
                            { id: 'tracking', name: 'تتبع المنتجات', icon: 'M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
                            { id: 'products', name: 'تفاصيل المنتجات', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
                            { id: 'contact', name: 'معلومات الاتصال', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' }
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
                        {/* Performance Trend Chart */}
                        <div className="bg-white rounded-xl border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">أداء المبيعات - آخر 6 أشهر</h3>
                            <div style={{ height: '300px' }}>
                                <Line
                                    data={{
                                        labels: performanceData.map(d => d.month),
                                        datasets: [{
                                            label: 'المبيعات',
                                            data: performanceData.map(d => d.sales),
                                            borderColor: '#10b981',
                                            backgroundColor: 'rgba(16, 185, 129, 0.1)',
                                            borderWidth: 3,
                                            fill: true,
                                            tension: 0.1
                                        }]
                                    }}
                                    options={performanceChartOptions}
                                />
                            </div>
                        </div>

                        {/* Category Breakdown */}
                        <div className="bg-white rounded-xl border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">توزيع المبيعات حسب الفئة</h3>
                            <div style={{ height: '300px' }}>
                                <Doughnut
                                    data={categoryComparisonData}
                                    options={{
                                        responsive: true,
                                        maintainAspectRatio: false,
                                        plugins: {
                                            legend: { position: 'bottom', labels: { font: { size: 12 } } },
                                            tooltip: {
                                                callbacks: {
                                                    label: function(context) {
                                                        return `${context.label}: ${formatCurrency(context.parsed)}`;
                                                    }
                                                }
                                            }
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'performance' && (
                    <div className="space-y-6">
                        {/* Daily Sales Chart */}
                        <div className="bg-white rounded-xl border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">المبيعات اليومية - الأسبوع الحالي</h3>
                            <div style={{ height: '300px' }}>
                                <Line
                                    data={{
                                        labels: dailySalesData.map(d => d.date),
                                        datasets: [{
                                            label: 'المبيعات اليومية',
                                            data: dailySalesData.map(d => d.value),
                                            borderColor: '#3b82f6',
                                            backgroundColor: 'rgba(59, 130, 246, 0.1)',
                                            borderWidth: 3,
                                            fill: true,
                                            tension: 0.1
                                        }]
                                    }}
                                    options={performanceChartOptions}
                                />
                            </div>
                        </div>

                        {/* Performance Metrics */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white rounded-xl border border-gray-200 p-6">
                                <h4 className="font-medium text-gray-900 mb-4">مقارنة الأداء</h4>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">الشهر الحالي</span>
                                        <span className="font-medium">{formatCurrency(supplier.performance.currentMonth)}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">الشهر الماضي</span>
                                        <span className="font-medium">{formatCurrency(supplier.performance.lastMonth)}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">النمو</span>
                                        <div className="flex items-center space-x-1 space-x-reverse">
                                            {getTrendIcon(supplier.performance.trend)}
                                            <span className={`font-medium ${getTrendColor(supplier.performance.trend)}`}>
                                                {Math.round(((supplier.performance.currentMonth - supplier.performance.lastMonth) / supplier.performance.lastMonth) * 100)}%
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl border border-gray-200 p-6">
                                <h4 className="font-medium text-gray-900 mb-4">مؤشرات الجودة</h4>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">تقييم الجودة</span>
                                        <span className="font-medium">{supplier.performance.qualityRating}/5</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">التسليم في الوقت</span>
                                        <span className="font-medium">{supplier.performance.onTimeDelivery}%</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">متوسط قيمة الطلب</span>
                                        <span className="font-medium">{formatCurrency(supplier.performance.averageOrderValue)}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl border border-gray-200 p-6">
                                <h4 className="font-medium text-gray-900 mb-4">توصيات</h4>
                                <div className="space-y-3">
                                    {supplier.performance.trend === 'up' ? (
                                        <div className="p-3 bg-green-50 rounded-lg">
                                            <div className="text-sm text-green-800 font-medium">أداء ممتاز</div>
                                            <div className="text-xs text-green-600">يُنصح بزيادة التعاون</div>
                                        </div>
                                    ) : (
                                        <div className="p-3 bg-yellow-50 rounded-lg">
                                            <div className="text-sm text-yellow-800 font-medium">يحتاج مراجعة</div>
                                            <div className="text-xs text-yellow-600">مراقبة الأداء عن كثب</div>
                                        </div>
                                    )}

                                    <div className="p-3 bg-blue-50 rounded-lg">
                                        <div className="text-sm text-blue-800 font-medium">استمرار التعاون</div>
                                        <div className="text-xs text-blue-600">مورد موثوق ومستقر</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'products' && (
                    <div className="space-y-6">
                        {/* Cleaning Products */}
                        <div className="bg-white rounded-xl border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-6">منتجات المنظفات</h3>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {products.cleaning.map((product, index) => (
                                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                                        <div className="flex items-center justify-between mb-3">
                                            <h4 className="font-medium text-gray-900">{product.name}</h4>
                                            <div className="flex items-center space-x-1 space-x-reverse">
                                                {getTrendIcon(product.trend)}
                                                <span className={`text-sm font-medium ${getTrendColor(product.trend)}`}>
                                                    {Math.round(((product.sales - product.lastMonthSales) / product.lastMonthSales) * 100)}%
                                                </span>
                                            </div>
                                        </div>

                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">الكمية المباعة:</span>
                                                <span className="font-medium">{formatNumber(product.quantity)} قطعة</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">مبيعات هذا الشهر:</span>
                                                <span className="font-medium text-blue-600">{formatCurrency(product.sales)}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">مبيعات الشهر الماضي:</span>
                                                <span className="font-medium text-gray-500">{formatCurrency(product.lastMonthSales)}</span>
                                            </div>
                                        </div>

                                        {/* Mini chart */}
                                        <div className="mt-4" style={{ height: '120px' }}>
                                            <Bar
                                                data={{
                                                    labels: ['الشهر الماضي', 'هذا الشهر'],
                                                    datasets: [{
                                                        data: [product.lastMonthSales, product.sales],
                                                        backgroundColor: ['#e5e7eb', '#3b82f6'],
                                                        borderWidth: 0
                                                    }]
                                                }}
                                                options={{
                                                    responsive: true,
                                                    maintainAspectRatio: false,
                                                    plugins: { legend: { display: false } },
                                                    scales: {
                                                        y: {
                                                            beginAtZero: true,
                                                            grid: { display: false },
                                                            ticks: { display: false }
                                                        },
                                                        x: {
                                                            grid: { display: false },
                                                            ticks: { font: { size: 10 }, color: '#6b7280' }
                                                        }
                                                    }
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Food Products */}
                        <div className="bg-white rounded-xl border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-6">المواد الغذائية</h3>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {products.food.map((product, index) => (
                                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                                        <div className="flex items-center justify-between mb-3">
                                            <h4 className="font-medium text-gray-900">{product.name}</h4>
                                            <div className="flex items-center space-x-1 space-x-reverse">
                                                {getTrendIcon(product.trend)}
                                                <span className={`text-sm font-medium ${getTrendColor(product.trend)}`}>
                                                    {Math.round(((product.sales - product.lastMonthSales) / product.lastMonthSales) * 100)}%
                                                </span>
                                            </div>
                                        </div>

                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">الكمية المباعة:</span>
                                                <span className="font-medium">{formatNumber(product.quantity)} قطعة</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">مبيعات هذا الشهر:</span>
                                                <span className="font-medium text-green-600">{formatCurrency(product.sales)}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">مبيعات الشهر الماضي:</span>
                                                <span className="font-medium text-gray-500">{formatCurrency(product.lastMonthSales)}</span>
                                            </div>
                                        </div>

                                        {/* Mini chart */}
                                        <div className="mt-4" style={{ height: '120px' }}>
                                            <Bar
                                                data={{
                                                    labels: ['الشهر الماضي', 'هذا الشهر'],
                                                    datasets: [{
                                                        data: [product.lastMonthSales, product.sales],
                                                        backgroundColor: ['#e5e7eb', '#10b981'],
                                                        borderWidth: 0
                                                    }]
                                                }}
                                                options={{
                                                    responsive: true,
                                                    maintainAspectRatio: false,
                                                    plugins: { legend: { display: false } },
                                                    scales: {
                                                        y: {
                                                            beginAtZero: true,
                                                            grid: { display: false },
                                                            ticks: { display: false }
                                                        },
                                                        x: {
                                                            grid: { display: false },
                                                            ticks: { font: { size: 10 }, color: '#6b7280' }
                                                        }
                                                    }
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'tracking' && (
                    <div className="space-y-6">
                        {/* Tracking Controls */}
                        <div className="bg-white rounded-xl border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-6">تتبع المنتجات عبر الزمن</h3>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Period Selection */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">الفترة الزمنية</label>
                                    <select
                                        value={trackingPeriod}
                                        onChange={(e) => setTrackingPeriod(e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="week">أسبوعي</option>
                                        <option value="month">شهري</option>
                                        <option value="quarter">ربع سنوي</option>
                                        <option value="year">سنوي</option>
                                    </select>
                                </div>

                                {/* Product Selection */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">المنتج</label>
                                    <select
                                        value={selectedProduct}
                                        onChange={(e) => setSelectedProduct(e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="all">جميع المنتجات</option>
                                        <optgroup label="منظفات">
                                            <option value="تايد مسحوق غسيل">تايد مسحوق غسيل</option>
                                            <option value="زاهي صابون سائل">زاهي صابون سائل</option>
                                        </optgroup>
                                        <optgroup label="مواد غذائية">
                                            <option value="تمن عنبر درجة أولى">تمن عنبر درجة أولى</option>
                                            <option value="معجون طماطم">معجون طماطم</option>
                                            <option value="زيت طبخ">زيت طبخ</option>
                                        </optgroup>
                                    </select>
                                </div>

                                {/* Date Range */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Custom Date Range</label>
                                    <div className="flex space-x-2 space-x-reverse">
                                        <input
                                            type="date"
                                            value={dateRange.startDate}
                                            onChange={(e) => setDateRange({...dateRange, startDate: e.target.value})}
                                            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        <input
                                            type="date"
                                            value={dateRange.endDate}
                                            onChange={(e) => setDateRange({...dateRange, endDate: e.target.value})}
                                            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div className="text-xs text-gray-500 mt-1">
                                        From {formatDate(dateRange.startDate)} to {formatDate(dateRange.endDate)}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Tracking Chart */}
                        <div className="bg-white rounded-xl border border-gray-200 p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    {selectedProduct === 'all' ? 'تتبع جميع المنتجات' : `تتبع ${selectedProduct}`}
                                </h3>
                                <div className="text-sm text-gray-500">
                                    Period: {trackingPeriod} | Updated: {formatDate(new Date())}
                                </div>
                            </div>

                            <div style={{ height: '400px' }}>
                                <Line
                                    data={{
                                        labels: trackingData[trackingPeriod].labels,
                                        datasets: [{
                                            label: selectedProduct === 'all' ? 'Total Sales' : selectedProduct,
                                            data: trackingData[trackingPeriod][selectedProduct] || [],
                                            borderColor: selectedProduct === 'all' ? '#3b82f6' : '#10b981',
                                            backgroundColor: selectedProduct === 'all' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                                            borderWidth: 3,
                                            fill: true,
                                            tension: 0.1,
                                            pointBackgroundColor: selectedProduct === 'all' ? '#3b82f6' : '#10b981',
                                            pointBorderColor: '#ffffff',
                                            pointBorderWidth: 2,
                                            pointRadius: 6
                                        }]
                                    }}
                                    options={{
                                        responsive: true,
                                        maintainAspectRatio: false,
                                        plugins: {
                                            legend: {
                                                position: 'top',
                                                labels: {
                                                    font: { size: 12 },
                                                    color: '#6b7280',
                                                    usePointStyle: true
                                                }
                                            },
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
                                                    callback: function(value) {
                                                        return formatCurrency(value);
                                                    }
                                                }
                                            },
                                            x: {
                                                grid: { color: '#e5e7eb' },
                                                ticks: { color: '#6b7280' }
                                            }
                                        }
                                    }}
                                />
                            </div>
                        </div>

                        {/* Statistics Summary */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <div className="bg-white rounded-xl border border-gray-200 p-6">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-blue-600">
                                        {formatCurrency(trackingData[trackingPeriod][selectedProduct]?.reduce((a, b) => a + b, 0) || 0)}
                                    </div>
                                    <div className="text-sm text-gray-600 mt-1">Total Sales</div>
                                    <div className="text-xs text-gray-500 mt-1">
                                        {trackingData[trackingPeriod].labels.length} periods
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl border border-gray-200 p-6">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-green-600">
                                        {formatCurrency(Math.max(...(trackingData[trackingPeriod][selectedProduct] || [0])))}
                                    </div>
                                    <div className="text-sm text-gray-600 mt-1">Peak Sales</div>
                                    <div className="text-xs text-gray-500 mt-1">Highest period</div>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl border border-gray-200 p-6">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-orange-600">
                                        {formatCurrency(Math.round((trackingData[trackingPeriod][selectedProduct]?.reduce((a, b) => a + b, 0) || 0) / (trackingData[trackingPeriod][selectedProduct]?.length || 1)))}
                                    </div>
                                    <div className="text-sm text-gray-600 mt-1">Average Sales</div>
                                    <div className="text-xs text-gray-500 mt-1">Per period</div>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl border border-gray-200 p-6">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-purple-600">
                                        {formatNumber(trackingData[trackingPeriod][selectedProduct]?.length || 0)}
                                    </div>
                                    <div className="text-sm text-gray-600 mt-1">Data Points</div>
                                    <div className="text-xs text-gray-500 mt-1">Available periods</div>
                                </div>
                            </div>
                        </div>

                        {/* Period Details Table */}
                        <div className="bg-white rounded-xl border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Detailed Breakdown</h3>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sales Amount</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Growth</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {trackingData[trackingPeriod].labels.map((label, index) => {
                                            const currentValue = trackingData[trackingPeriod][selectedProduct]?.[index] || 0;
                                            const previousValue = trackingData[trackingPeriod][selectedProduct]?.[index - 1] || 0;
                                            const growth = previousValue > 0 ? ((currentValue - previousValue) / previousValue * 100) : 0;

                                            return (
                                                <tr key={index}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{label}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(currentValue)}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                        {index > 0 && (
                                                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                                                growth > 0 ? 'bg-green-100 text-green-800' :
                                                                growth < 0 ? 'bg-red-100 text-red-800' :
                                                                'bg-gray-100 text-gray-800'
                                                            }`}>
                                                                {growth > 0 ? '+' : ''}{growth.toFixed(1)}%
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        <div className="flex items-center">
                                                            <div className="w-16 bg-gray-200 rounded-full h-2">
                                                                <div
                                                                    className="bg-blue-600 h-2 rounded-full"
                                                                    style={{
                                                                        width: `${Math.min(100, (currentValue / Math.max(...(trackingData[trackingPeriod][selectedProduct] || [1]))) * 100)}%`
                                                                    }}
                                                                ></div>
                                                            </div>
                                                            <span className="ml-2 text-xs text-gray-500">
                                                                {Math.round((currentValue / Math.max(...(trackingData[trackingPeriod][selectedProduct] || [1]))) * 100)}%
                                                            </span>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'contact' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-white rounded-xl border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-6">معلومات الاتصال</h3>
                            <div className="space-y-4">
                                <div className="flex items-center space-x-3 space-x-reverse">
                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="font-medium text-gray-900">الشخص المسؤول</div>
                                        <div className="text-gray-600">{supplier.contact}</div>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3 space-x-reverse">
                                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="font-medium text-gray-900">رقم الهاتف</div>
                                        <div className="text-gray-600">{supplier.phone}</div>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3 space-x-reverse">
                                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="font-medium text-gray-900">البريد الإلكتروني</div>
                                        <div className="text-gray-600">{supplier.email}</div>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-3 space-x-reverse">
                                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                                        <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="font-medium text-gray-900">العنوان</div>
                                        <div className="text-gray-600">{supplier.address}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-6">تفاصيل إضافية</h3>
                            <div className="space-y-4">
                                <div>
                                    <div className="font-medium text-gray-900 mb-1">تاريخ التأسيس</div>
                                    <div className="text-gray-600">{formatDate(supplier.establishedDate)}</div>
                                </div>

                                <div>
                                    <div className="font-medium text-gray-900 mb-1">تاريخ بداية التعاقد</div>
                                    <div className="text-gray-600">{formatDate(supplier.contractDate)}</div>
                                </div>

                                <div>
                                    <div className="font-medium text-gray-900 mb-1">آخر طلب</div>
                                    <div className="text-gray-600">{formatDate(supplier.lastOrder)}</div>
                                </div>

                                <div>
                                    <div className="font-medium text-gray-900 mb-1">التخصصات</div>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {supplier.categories.map((category, index) => (
                                            <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                                {category}
                                            </span>
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
