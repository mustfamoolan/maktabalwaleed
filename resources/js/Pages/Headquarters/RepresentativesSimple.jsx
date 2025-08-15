import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import HeadquartersLayout from '@/Layouts/HeadquartersLayout';

export default function Representatives({ representatives = [], pageTitle }) {
    const [showAddForm, setShowAddForm] = useState(false);
    const [selectedRep, setSelectedRep] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        identity_number: '',
        address: '',
        areas: [],
        product_categories: [],
        monthly_target: '',
        hire_date: '',
        notes: '',
    });

    const [availableAreas] = useState([
        'بغداد - الكرخ',
        'بغداد - الرصافة',
        'البصرة',
        'نينوى',
        'أربيل',
        'دهوك',
        'السليمانية',
        'كربلاء',
        'النجف',
        'ذي قار'
    ]);

    const [availableCategories] = useState([
        'مواد غذائية',
        'منظفات'
    ]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/headquarters/api/representatives', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (result.success) {
                alert('تم إضافة المندوب بنجاح');
                setShowAddForm(false);
                setFormData({
                    name: '',
                    phone: '',
                    identity_number: '',
                    address: '',
                    areas: [],
                    product_categories: [],
                    monthly_target: '',
                    hire_date: '',
                    notes: '',
                });
                window.location.reload();
            } else {
                alert('حدث خطأ أثناء إضافة المندوب');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('حدث خطأ في الاتصال');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCheckboxChange = (name, value) => {
        setFormData(prev => ({
            ...prev,
            [name]: prev[name].includes(value)
                ? prev[name].filter(item => item !== value)
                : [...prev[name], value]
        }));
    };

    const viewRepresentativeDetails = (rep) => {
        setSelectedRep(rep);
        setShowDetailsModal(true);
    };

    const deleteRepresentative = async (id) => {
        if (!confirm('هل أنت متأكد من حذف هذا المندوب؟')) return;

        try {
            const response = await fetch(`/headquarters/api/representatives/${id}`, {
                method: 'DELETE',
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                }
            });

            const result = await response.json();

            if (result.success) {
                alert('تم حذف المندوب بنجاح');
                window.location.reload();
            } else {
                alert('حدث خطأ أثناء حذف المندوب');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('حدث خطأ في الاتصال');
        }
    };

    return (
        <HeadquartersLayout>
            <Head title={pageTitle} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">إدارة المندوبين</h1>
                    <button
                        onClick={() => setShowAddForm(true)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition duration-200"
                    >
                        إضافة مندوب جديد
                    </button>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="text-3xl font-bold text-blue-600">{representatives.length}</div>
                            <div className="mr-4">
                                <div className="text-sm font-medium text-gray-600">إجمالي المندوبين</div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="text-3xl font-bold text-green-600">
                                {representatives.filter(rep => rep.status === 'active').length}
                            </div>
                            <div className="mr-4">
                                <div className="text-sm font-medium text-gray-600">المندوبين النشطين</div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="text-3xl font-bold text-purple-600">
                                {representatives.reduce((sum, rep) => sum + (rep.cartons_sold || 0), 0)}
                            </div>
                            <div className="mr-4">
                                <div className="text-sm font-medium text-gray-600">إجمالي الكراتين المباعة</div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="text-3xl font-bold text-yellow-600">
                                {representatives.reduce((sum, rep) => sum + (rep.commission_earned || 0), 0).toLocaleString()}
                            </div>
                            <div className="mr-4">
                                <div className="text-sm font-medium text-gray-600">إجمالي العمولات (دينار)</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Representatives Table */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-900">قائمة المندوبين</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        الاسم
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        الهاتف
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        الهدف الشهري
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        المبيعات الحالية
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        نسبة الإنجاز
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        الحالة
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        الإجراءات
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {representatives.map((rep) => (
                                    <tr key={rep.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{rep.name}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{rep.phone}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                {Number(rep.monthly_target || 0).toLocaleString()} دينار
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                {Number(rep.current_sales || 0).toLocaleString()} دينار
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {rep.achievement_percentage || 0}%
                                                </div>
                                                <div className="ml-2 w-16 bg-gray-200 rounded-full h-2">
                                                    <div
                                                        className={`h-2 rounded-full ${
                                                            (rep.achievement_percentage || 0) >= 100 ? 'bg-green-500' :
                                                            (rep.achievement_percentage || 0) >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                                                        }`}
                                                        style={{ width: `${Math.min(rep.achievement_percentage || 0, 100)}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                rep.status === 'active' ? 'bg-green-100 text-green-800' :
                                                rep.status === 'inactive' ? 'bg-gray-100 text-gray-800' :
                                                'bg-red-100 text-red-800'
                                            }`}>
                                                {rep.status === 'active' ? 'نشط' :
                                                 rep.status === 'inactive' ? 'غير نشط' : 'معلق'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <button
                                                onClick={() => viewRepresentativeDetails(rep)}
                                                className="text-blue-600 hover:text-blue-900 ml-3"
                                            >
                                                عرض
                                            </button>
                                            <button
                                                onClick={() => deleteRepresentative(rep.id)}
                                                className="text-red-600 hover:text-red-900"
                                            >
                                                حذف
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Add Representative Modal */}
            {showAddForm && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                    <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">إضافة مندوب جديد</h3>
                            <button
                                onClick={() => setShowAddForm(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                ✕
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        الاسم *
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        رقم الهاتف *
                                    </label>
                                    <input
                                        type="text"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        رقم الهوية *
                                    </label>
                                    <input
                                        type="text"
                                        name="identity_number"
                                        value={formData.identity_number}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        تاريخ التوظيف *
                                    </label>
                                    <input
                                        type="date"
                                        name="hire_date"
                                        value={formData.hire_date}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    العنوان *
                                </label>
                                <textarea
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    required
                                    rows="2"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    الهدف الشهري (دينار)
                                </label>
                                <input
                                    type="number"
                                    name="monthly_target"
                                    value={formData.monthly_target}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    المناطق المسؤول عنها
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                    {availableAreas.map((area) => (
                                        <label key={area} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={formData.areas.includes(area)}
                                                onChange={() => handleCheckboxChange('areas', area)}
                                                className="ml-2"
                                            />
                                            <span className="text-sm">{area}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    أنواع المنتجات
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                    {availableCategories.map((category) => (
                                        <label key={category} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={formData.product_categories.includes(category)}
                                                onChange={() => handleCheckboxChange('product_categories', category)}
                                                className="ml-2"
                                            />
                                            <span className="text-sm">{category}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    ملاحظات
                                </label>
                                <textarea
                                    name="notes"
                                    value={formData.notes}
                                    onChange={handleInputChange}
                                    rows="3"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="flex justify-end space-x-3 space-x-reverse pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowAddForm(false)}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                                >
                                    إلغاء
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
                                >
                                    إضافة المندوب
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Representative Details Modal */}
            {showDetailsModal && selectedRep && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                    <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">تفاصيل المندوب</h3>
                            <button
                                onClick={() => setShowDetailsModal(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <strong>الاسم:</strong> {selectedRep.name}
                                </div>
                                <div>
                                    <strong>الهاتف:</strong> {selectedRep.phone}
                                </div>
                                <div>
                                    <strong>الهدف الشهري:</strong> {Number(selectedRep.monthly_target || 0).toLocaleString()} دينار
                                </div>
                                <div>
                                    <strong>المبيعات الحالية:</strong> {Number(selectedRep.current_sales || 0).toLocaleString()} دينار
                                </div>
                                <div>
                                    <strong>نسبة الإنجاز:</strong> {selectedRep.achievement_percentage || 0}%
                                </div>
                                <div>
                                    <strong>العمولة المكتسبة:</strong> {Number(selectedRep.commission_earned || 0).toLocaleString()} دينار
                                </div>
                                <div>
                                    <strong>الكراتين المباعة:</strong> {selectedRep.cartons_sold || 0}
                                </div>
                                <div>
                                    <strong>إجمالي الديون:</strong> {Number(selectedRep.total_debt || 0).toLocaleString()} دينار
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </HeadquartersLayout>
    );
}
