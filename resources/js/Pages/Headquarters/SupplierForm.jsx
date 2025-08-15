import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import HeadquartersLayout from '@/Layouts/HeadquartersLayout';

export default function SupplierForm({ supplier, categories }) {
    const isEditing = !!supplier;

    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: supplier?.name || '',
        description: supplier?.description || '',
        product_categories: supplier?.product_categories || [],
        notes: supplier?.notes || '',
        status: supplier?.status || 'active',
    });    const handleSubmit = (e) => {
        e.preventDefault();

        if (isEditing) {
            put(`/headquarters/suppliers/${supplier.id}`);
        } else {
            post('/headquarters/suppliers');
        }
    };    const handleCategoryChange = (categoryKey) => {
        const newCategories = data.product_categories.includes(categoryKey)
            ? data.product_categories.filter(cat => cat !== categoryKey)
            : [...data.product_categories, categoryKey];

        setData('product_categories', newCategories);
    };

    return (
        <HeadquartersLayout>
            <Head title={isEditing ? 'تعديل مورد' : 'إضافة مورد جديد'} />

            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* العنوان */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">
                                    {isEditing ? 'تعديل بيانات المورد' : 'إضافة مورد جديد'}
                                </h1>
                                <p className="text-gray-600 mt-1">
                                    {isEditing ? 'قم بتعديل بيانات المورد' : 'أدخل بيانات المورد الجديد'}
                                </p>
                            </div>
                            <Link
                                href="/headquarters/suppliers"
                                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                            >
                                عودة للقائمة
                            </Link>
                        </div>
                    </div>

                    {/* نموذج إضافة/تعديل المورد */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                        <form onSubmit={handleSubmit} className="p-6 space-y-6">

                            {/* اسم المورد */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    اسم المورد *
                                </label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="مثال: شركة جيهان للتوريدات"
                                    required
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                                )}
                            </div>

                            {/* فئات المنتجات */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    فئات المنتجات التي يوفرها المورد *
                                </label>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                    {Object.entries(categories).map(([key, name]) => (
                                        <label key={key} className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={data.product_categories.includes(key)}
                                                onChange={() => handleCategoryChange(key)}
                                                className="ml-2 text-blue-600 focus:ring-blue-500"
                                            />
                                            <span className="text-sm text-gray-700">{name}</span>
                                        </label>
                                    ))}
                                </div>
                                {errors.product_categories && (
                                    <p className="text-red-500 text-sm mt-1">{errors.product_categories}</p>
                                )}
                            </div>

                            {/* الوصف */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    وصف المورد
                                </label>
                                <textarea
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    rows="3"
                                    placeholder="وصف عام عن المورد ونوعية منتجاته"
                                />
                                {errors.description && (
                                    <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                                )}
                            </div>

                            {/* الملاحظات */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    ملاحظات
                                </label>
                                <textarea
                                    value={data.notes}
                                    onChange={(e) => setData('notes', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    rows="3"
                                    placeholder="أي ملاحظات إضافية"
                                />
                                {errors.notes && (
                                    <p className="text-red-500 text-sm mt-1">{errors.notes}</p>
                                )}
                            </div>

                            {/* الحالة (للتعديل فقط) */}
                            {isEditing && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        حالة المورد
                                    </label>
                                    <select
                                        value={data.status}
                                        onChange={(e) => setData('status', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="active">نشط</option>
                                        <option value="inactive">غير نشط</option>
                                    </select>
                                    {errors.status && (
                                        <p className="text-red-500 text-sm mt-1">{errors.status}</p>
                                    )}
                                </div>
                            )}

                            {/* أزرار الحفظ */}
                            <div className="flex justify-end space-x-3 space-x-reverse pt-6 border-t border-gray-200">
                                <Link
                                    href="/headquarters/suppliers"
                                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    إلغاء
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                                >
                                    {processing ? 'جاري الحفظ...' : (isEditing ? 'تحديث البيانات' : 'إضافة المورد')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </HeadquartersLayout>
    );
}
