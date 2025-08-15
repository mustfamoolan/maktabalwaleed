import React, { useState, useEffect } from 'react';
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

// Chart Component using Chart.js for Product Movement
const ProductMovementChart = ({ data, title = "حركة المنتجات اليومية" }) => {
    const isValueChart = title.includes('قيمة');

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
                borderColor: '#3b82f6',
                borderWidth: 1,
                callbacks: {
                    label: function(context) {
                        if (isValueChart) {
                            return `القيمة: ${new Intl.NumberFormat('en-US').format(context.parsed.y)} د.ع`;
                        } else {
                            return `الكمية: ${context.parsed.y} منتج`;
                        }
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
                        if (isValueChart) {
                            return new Intl.NumberFormat('en-US').format(value);
                        } else {
                            return value;
                        }
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
                label: isValueChart ? 'القيمة' : 'الكمية',
                data: data.map(item => item.value),
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                borderWidth: 3,
                fill: true,
                pointBackgroundColor: '#3b82f6',
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
};export default function Warehouse() {
    const [activeTab, setActiveTab] = useState('overview');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [filterCategory, setFilterCategory] = useState('all');
    const [showProductChart, setShowProductChart] = useState(false);

    // Handle Escape key to close modal
    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === 'Escape' && showProductChart) {
                setShowProductChart(false);
                setSelectedProduct(null);
            }
        };

        if (showProductChart) {
            document.addEventListener('keydown', handleEscape);
            // Prevent background scrolling when modal is open
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [showProductChart]);

    // Mock data for products
    const products = [
        {
            id: 1,
            name: 'تايد مسحوق غسيل',
            category: 'منظفات',
            supplier: 'شركة سدرة العائلة',
            barcode: '1234567890123',
            purchasePrice: 15000,
            salePrice: 18000,
            weight: '2.5 كغ',
            packaging: '12 علبة/كرتون',
            quantity: 150,
            minQuantity: 20,
            entryDate: '2025-08-01',
            expiryDate: '2027-08-01',
            lastSale: '2025-08-14',
            totalSold: 85,
            status: 'متوفر',
            daysSinceLastSale: 1,
            profitMargin: 3000
        },
        {
            id: 2,
            name: 'زاهي صابون سائل',
            category: 'منظفات',
            supplier: 'شركة سدرة العائلة',
            barcode: '1234567890124',
            purchasePrice: 8000,
            salePrice: 10000,
            weight: '500 مل',
            packaging: '24 قنينة/كرتون',
            quantity: 8,
            minQuantity: 15,
            entryDate: '2025-07-20',
            expiryDate: '2026-07-20',
            lastSale: '2025-08-10',
            totalSold: 42,
            status: 'مخزون منخفض',
            daysSinceLastSale: 5,
            profitMargin: 2000
        },
        {
            id: 3,
            name: 'تمن عنبر درجة أولى',
            category: 'مواد غذائية',
            supplier: 'شركة جيهان',
            barcode: '1234567890125',
            purchasePrice: 25000,
            salePrice: 28000,
            weight: '5 كغ',
            packaging: '8 أكياس/كرتون',
            quantity: 0,
            minQuantity: 10,
            entryDate: '2025-07-15',
            expiryDate: '2026-01-15',
            lastSale: '2025-08-13',
            totalSold: 120,
            status: 'نافد',
            daysSinceLastSale: 2,
            profitMargin: 3000
        },
        {
            id: 4,
            name: 'معجون طماطم',
            category: 'مواد غذائية',
            supplier: 'شركة جيهان',
            barcode: '1234567890126',
            purchasePrice: 12000,
            salePrice: 14000,
            weight: '800 غم',
            packaging: '12 علبة/كرتون',
            quantity: 45,
            minQuantity: 20,
            entryDate: '2025-06-01',
            expiryDate: '2025-12-01',
            lastSale: '2025-07-25',
            totalSold: 25,
            status: 'بيع بطيء',
            daysSinceLastSale: 21,
            profitMargin: 2000
        },
        {
            id: 5,
            name: 'شامبو للشعر الجاف',
            category: 'منظفات',
            supplier: 'مؤسسة النور التجارية',
            barcode: '1234567890127',
            purchasePrice: 18000,
            salePrice: 16000,
            weight: '400 مل',
            packaging: '16 قنينة/كرتون',
            quantity: 30,
            minQuantity: 10,
            entryDate: '2025-05-15',
            expiryDate: '2025-11-15',
            lastSale: '2025-08-12',
            totalSold: 8,
            status: 'خسارة',
            daysSinceLastSale: 3,
            profitMargin: -2000
        }
    ];

    // Daily movement data for charts (total products moved per day)
    const dailyMovementData = [
        { date: '2025/8/13', value: 45 },
        { date: '2025/8/14', value: 38 },
        { date: '2025/8/15', value: 52 },
        { date: '2025/8/16', value: 29 },
        { date: '2025/8/17', value: 18 },
        { date: '2025/8/18', value: 0 }
    ];

    // Daily sales value data
    const dailySalesValueData = [
        { date: '2025/8/13', value: 850000 },
        { date: '2025/8/14', value: 720000 },
        { date: '2025/8/15', value: 950000 },
        { date: '2025/8/16', value: 580000 },
        { date: '2025/8/17', value: 420000 },
        { date: '2025/8/18', value: 0 }
    ];

    // Individual product sales data
    const productSalesData = {
        1: [ // تايد مسحوق غسيل
            { date: '2025/8/13', value: 12 },
            { date: '2025/8/14', value: 8 },
            { date: '2025/8/15', value: 15 },
            { date: '2025/8/16', value: 6 },
            { date: '2025/8/17', value: 4 },
            { date: '2025/8/18', value: 0 }
        ],
        2: [ // زاهي صابون سائل
            { date: '2025/8/13', value: 5 },
            { date: '2025/8/14', value: 3 },
            { date: '2025/8/15', value: 8 },
            { date: '2025/8/16', value: 2 },
            { date: '2025/8/17', value: 1 },
            { date: '2025/8/18', value: 0 }
        ],
        3: [ // تمن عنبر
            { date: '2025/8/13', value: 20 },
            { date: '2025/8/14', value: 15 },
            { date: '2025/8/15', value: 25 },
            { date: '2025/8/16', value: 12 },
            { date: '2025/8/17', value: 8 },
            { date: '2025/8/18', value: 0 }
        ],
        4: [ // معجون طماطم
            { date: '2025/8/13', value: 3 },
            { date: '2025/8/14', value: 2 },
            { date: '2025/8/15', value: 4 },
            { date: '2025/8/16', value: 1 },
            { date: '2025/8/17', value: 0 },
            { date: '2025/8/18', value: 0 }
        ],
        5: [ // شامبو
            { date: '2025/8/13', value: 1 },
            { date: '2025/8/14', value: 0 },
            { date: '2025/8/15', value: 2 },
            { date: '2025/8/16', value: 1 },
            { date: '2025/8/17', value: 0 },
            { date: '2025/8/18', value: 0 }
        ]
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US').format(amount) + ' د.ع';
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US');
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'متوفر': return 'bg-green-100 text-green-800 border-green-200';
            case 'مخزون منخفض': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'نافد': return 'bg-red-100 text-red-800 border-red-200';
            case 'بيع بطيء': return 'bg-orange-100 text-orange-800 border-orange-200';
            case 'خسارة': return 'bg-purple-100 text-purple-800 border-purple-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getCategoryIcon = (category) => {
        switch (category) {
            case 'منظفات':
                return 'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16';
            case 'مواد غذائية':
                return 'M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.35-2.7M17 21a2 2 0 100-4 2 2 0 000 4zM9 21a2 2 0 100-4 2 2 0 000 4z';
            default:
                return 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4';
        }
    };

    const filteredProducts = filterCategory === 'all'
        ? products
        : products.filter(product => product.category === filterCategory);

    const inventoryStats = {
        totalProducts: products.length,
        inStock: products.filter(p => p.quantity > 0).length,
        lowStock: products.filter(p => p.quantity > 0 && p.quantity <= p.minQuantity).length,
        outOfStock: products.filter(p => p.quantity === 0).length,
        slowMoving: products.filter(p => p.daysSinceLastSale > 20).length,
        totalValue: products.reduce((sum, p) => sum + (p.quantity * p.purchasePrice), 0),
        lossProducts: products.filter(p => p.profitMargin < 0).length
    };

    const getExpiryStatus = (expiryDate) => {
        const today = new Date();
        const expiry = new Date(expiryDate);
        const diffTime = expiry - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 30) return 'قريب الانتهاء';
        if (diffDays < 90) return 'تحذير';
        return 'صالح';
    };

    const getExpiryColor = (expiryDate) => {
        const status = getExpiryStatus(expiryDate);
        switch (status) {
            case 'قريب الانتهاء': return 'text-red-600';
            case 'تحذير': return 'text-yellow-600';
            default: return 'text-green-600';
        }
    };

    return (
        <HeadquartersLayout>
            <Head title="إدارة المخزن" />

            <div className="p-6 space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">إدارة المخزن</h1>
                        <p className="text-gray-600 mt-1">تتبع المنتجات والمخزون</p>
                    </div>
                    <div className="flex space-x-3 space-x-reverse">
                        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 space-x-reverse">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            <span>إضافة منتج</span>
                        </button>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 space-x-reverse">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                            </svg>
                            <span>استيراد من ملف</span>
                        </button>
                    </div>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                    <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600">{inventoryStats.totalProducts}</div>
                            <div className="text-xs text-gray-600">إجمالي المنتجات</div>
                        </div>
                    </div>

                    <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-green-600">{inventoryStats.inStock}</div>
                            <div className="text-xs text-gray-600">متوفر</div>
                        </div>
                    </div>

                    <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-yellow-600">{inventoryStats.lowStock}</div>
                            <div className="text-xs text-gray-600">مخزون منخفض</div>
                        </div>
                    </div>

                    <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-red-600">{inventoryStats.outOfStock}</div>
                            <div className="text-xs text-gray-600">نافد</div>
                        </div>
                    </div>

                    <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-orange-600">{inventoryStats.slowMoving}</div>
                            <div className="text-xs text-gray-600">بيع بطيء</div>
                        </div>
                    </div>

                    <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-purple-600">{inventoryStats.lossProducts}</div>
                            <div className="text-xs text-gray-600">خسائر</div>
                        </div>
                    </div>

                    <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-200">
                        <div className="text-center">
                            <div className="text-lg font-bold text-indigo-600">{formatCurrency(inventoryStats.totalValue)}</div>
                            <div className="text-xs text-gray-600">القيمة الإجمالية</div>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-xl border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 space-x-reverse">
                            <label className="text-sm font-medium text-gray-700">فئة المنتج:</label>
                            <select
                                value={filterCategory}
                                onChange={(e) => setFilterCategory(e.target.value)}
                                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="all">جميع الفئات</option>
                                <option value="منظفات">منظفات</option>
                                <option value="مواد غذائية">مواد غذائية</option>
                                <option value="حفاضات">حفاضات</option>
                            </select>
                        </div>
                        <div className="flex items-center space-x-2 space-x-reverse">
                            <button className="text-sm text-blue-600 hover:text-blue-800">تصدير للاكسل</button>
                            <button className="text-sm text-green-600 hover:text-green-800">طباعة التقرير</button>
                        </div>
                    </div>
                </div>

                {/* Products Table */}
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900">جرد المنتجات</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">المنتج</th>
                                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الباركود</th>
                                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">المورد</th>
                                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الأسعار</th>
                                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الكمية</th>
                                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الصلاحية</th>
                                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">آخر بيع</th>
                                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الحالة</th>
                                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">العمليات</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredProducts.map((product) => (
                                    <tr key={product.id} className="hover:bg-gray-50">
                                        <td className="px-4 py-4">
                                            <div className="flex items-center">
                                                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center ml-3">
                                                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={getCategoryIcon(product.category)} />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                                    <div className="text-xs text-gray-500">{product.category}</div>
                                                    <div className="text-xs text-gray-400">{product.weight} | {product.packaging}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="text-sm font-mono text-gray-900">{product.barcode}</div>
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="text-sm text-gray-900">{product.supplier}</div>
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="text-sm">
                                                <div className="text-gray-600">شراء: {formatCurrency(product.purchasePrice)}</div>
                                                <div className="text-gray-900 font-medium">بيع: {formatCurrency(product.salePrice)}</div>
                                                <div className={`text-xs ${product.profitMargin >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                    ربح: {formatCurrency(product.profitMargin)}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="text-sm">
                                                <div className="font-medium text-gray-900">{product.quantity}</div>
                                                <div className="text-xs text-gray-500">الحد الأدنى: {product.minQuantity}</div>
                                                <div className="text-xs text-gray-500">مُباع: {product.totalSold}</div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="text-sm">
                                                <div className="text-gray-900">{formatDate(product.expiryDate)}</div>
                                                <div className={`text-xs ${getExpiryColor(product.expiryDate)}`}>
                                                    {getExpiryStatus(product.expiryDate)}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="text-sm">
                                                <div className="text-gray-900">{formatDate(product.lastSale)}</div>
                                                <div className="text-xs text-gray-500">منذ {product.daysSinceLastSale} يوم</div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4">
                                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(product.status)}`}>
                                                {product.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="flex items-center space-x-2 space-x-reverse">
                                                <button
                                                    onClick={() => {
                                                        setSelectedProduct(product);
                                                        setShowProductChart(true);
                                                    }}
                                                    className="text-blue-600 hover:text-blue-800 text-sm"
                                                >
                                                    عرض التفاصيل
                                                </button>
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

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-red-50 rounded-xl border border-red-200 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-red-900">منتجات نافدة</h3>
                            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.232 16c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                        </div>
                        <div className="space-y-2">
                            {products.filter(p => p.quantity === 0).map((product) => (
                                <div key={product.id} className="text-sm text-red-800">
                                    • {product.name}
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg text-sm">
                            طلب إعادة تموين
                        </button>
                    </div>

                    <div className="bg-orange-50 rounded-xl border border-orange-200 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-orange-900">بيع بطيء</h3>
                            <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div className="space-y-2">
                            {products.filter(p => p.daysSinceLastSale > 20).map((product) => (
                                <div key={product.id} className="text-sm text-orange-800">
                                    • {product.name} (منذ {product.daysSinceLastSale} يوم)
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-4 bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-lg text-sm">
                            إجراء خصم
                        </button>
                    </div>

                    <div className="bg-purple-50 rounded-xl border border-purple-200 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-purple-900">منتجات خاسرة</h3>
                            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                            </svg>
                        </div>
                        <div className="space-y-2">
                            {products.filter(p => p.profitMargin < 0).map((product) => (
                                <div key={product.id} className="text-sm text-purple-800">
                                    • {product.name} ({formatCurrency(product.profitMargin)})
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg text-sm">
                            مراجعة الأسعار
                        </button>
                    </div>
                </div>

                {/* Product Details Modal */}
                {showProductChart && selectedProduct && (
                    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                            {/* Background overlay */}
                            <div
                                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                                aria-hidden="true"
                                onClick={() => {
                                    setShowProductChart(false);
                                    setSelectedProduct(null);
                                }}
                            ></div>

                            {/* This element is to trick the browser into centering the modal contents. */}
                            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                            {/* Modal panel */}
                            <div className="relative inline-block align-bottom bg-white rounded-lg text-right overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                                            تفاصيل المنتج - {selectedProduct.name}
                                        </h3>
                                        <button
                                            onClick={() => {
                                                setShowProductChart(false);
                                                setSelectedProduct(null);
                                            }}
                                            className="text-gray-400 hover:text-gray-600"
                                        >
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>

                                    {/* Product Info */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                        <div className="bg-gray-50 rounded-lg p-4">
                                            <h4 className="font-medium text-gray-900 mb-3">معلومات المنتج</h4>
                                            <div className="space-y-2 text-sm">
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">الباركود:</span>
                                                    <span className="font-mono">{selectedProduct.barcode}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">المورد:</span>
                                                    <span>{selectedProduct.supplier}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">الوزن:</span>
                                                    <span>{selectedProduct.weight}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">العبوة:</span>
                                                    <span>{selectedProduct.packaging}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-gray-50 rounded-lg p-4">
                                            <h4 className="font-medium text-gray-900 mb-3">معلومات المبيعات</h4>
                                            <div className="space-y-2 text-sm">
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">سعر الشراء:</span>
                                                    <span>{formatCurrency(selectedProduct.purchasePrice)}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">سعر البيع:</span>
                                                    <span>{formatCurrency(selectedProduct.salePrice)}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">الربح:</span>
                                                    <span className={selectedProduct.profitMargin >= 0 ? 'text-green-600' : 'text-red-600'}>
                                                        {formatCurrency(selectedProduct.profitMargin)}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">إجمالي المباع:</span>
                                                    <span>{selectedProduct.totalSold} قطعة</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Product Sales Chart */}
                                    <div className="mb-6">
                                        <ProductMovementChart
                                            data={productSalesData[selectedProduct.id] || []}
                                            title={`مبيعات ${selectedProduct.name} - الأيام الماضية`}
                                        />
                                    </div>

                                    {/* Stock Info */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="bg-blue-50 rounded-lg p-4 text-center">
                                            <div className="text-2xl font-bold text-blue-600">{selectedProduct.quantity}</div>
                                            <div className="text-sm text-gray-600">الكمية المتوفرة</div>
                                        </div>
                                        <div className="bg-orange-50 rounded-lg p-4 text-center">
                                            <div className="text-2xl font-bold text-orange-600">{selectedProduct.minQuantity}</div>
                                            <div className="text-sm text-gray-600">الحد الأدنى</div>
                                        </div>
                                        <div className="bg-green-50 rounded-lg p-4 text-center">
                                            <div className="text-2xl font-bold text-green-600">{selectedProduct.daysSinceLastSale}</div>
                                            <div className="text-sm text-gray-600">أيام منذ آخر بيع</div>
                                        </div>
                                    </div>
                                </div>

                                                                {/* Sales Chart */}
                                <div className="mt-6">
                                    <ProductMovementChart
                                        data={productSalesData[selectedProduct.id] || []}
                                        title={`مبيعات ${selectedProduct.name} - آخر 6 أيام`}
                                    />
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowProductChart(false);
                                        setSelectedProduct(null);
                                    }}
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm transition-colors duration-200"
                                >
                                    إغلاق
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </HeadquartersLayout>
    );
}
