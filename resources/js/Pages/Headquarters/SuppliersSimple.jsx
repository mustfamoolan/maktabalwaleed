import React from 'react';
import { Head } from '@inertiajs/react';
import HeadquartersLayout from '@/Layouts/HeadquartersLayout';

export default function Suppliers({ suppliers, categories, filters }) {
    return (
        <HeadquartersLayout>
            <Head title="إدارة الموردين" />

            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* العنوان */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">إدارة الموردين</h1>
                                <p className="text-gray-600 mt-1">إدارة بيانات الموردين والشركات المتعاملة</p>
                            </div>
                            <a
                                href="/headquarters/suppliers/create"
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                            >
                                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                إضافة مورد جديد
                            </a>
                        </div>

                        {/* إحصائيات سريعة */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <div className="text-2xl font-bold text-blue-600">{suppliers?.total || 0}</div>
                                <div className="text-sm text-blue-600">إجمالي الموردين</div>
                            </div>
                            <div className="bg-green-50 p-4 rounded-lg">
                                <div className="text-2xl font-bold text-green-600">
                                    {suppliers?.data?.filter(s => s.status === 'active').length || 0}
                                </div>
                                <div className="text-sm text-green-600">الموردين النشطين</div>
                            </div>
                            <div className="bg-yellow-50 p-4 rounded-lg">
                                <div className="text-2xl font-bold text-yellow-600">
                                    {Object.keys(categories || {}).length}
                                </div>
                                <div className="text-sm text-yellow-600">فئات المنتجات</div>
                            </div>
                            <div className="bg-purple-50 p-4 rounded-lg">
                                <div className="text-2xl font-bold text-purple-600">
                                    {suppliers?.data?.reduce((sum, s) => sum + (parseFloat(s.current_balance) || 0), 0).toLocaleString() || 0}
                                </div>
                                <div className="text-sm text-purple-600">إجمالي الأرصدة (دينار)</div>
                            </div>
                        </div>
                    </div>

                    {/* قائمة الموردين */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                        <div className="p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">قائمة الموردين</h2>

                            {suppliers?.data?.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                                                    اسم المورد
                                                </th>
                                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                                                    فئات المنتجات
                                                </th>
                                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                                                    الرصيد الحالي
                                                </th>
                                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                                                    الحالة
                                                </th>
                                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                                                    العمليات
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {suppliers.data.map((supplier) => (
                                                <tr key={supplier.id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div>
                                                            <div className="text-sm font-medium text-gray-900">
                                                                {supplier.name}
                                                            </div>
                                                            {supplier.description && (
                                                                <div className="text-sm text-gray-500 truncate max-w-xs">
                                                                    {supplier.description}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex flex-wrap gap-1">
                                                            {supplier.product_categories?.map((category, index) => (
                                                                <span key={index} className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
                                                                    {categories?.[category] || category}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {supplier.current_balance?.toLocaleString() || 0} دينار
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {supplier.status === 'active' ? (
                                                            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">نشط</span>
                                                        ) : (
                                                            <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">غير نشط</span>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                        <div className="flex space-x-2 space-x-reverse">
                                                            <a
                                                                href={`/headquarters/suppliers/${supplier.id}`}
                                                                className="text-blue-600 hover:text-blue-900"
                                                            >
                                                                عرض
                                                            </a>
                                                            <a
                                                                href={`/headquarters/suppliers/${supplier.id}/edit`}
                                                                className="text-green-600 hover:text-green-900"
                                                            >
                                                                تعديل
                                                            </a>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    <h3 className="mt-2 text-sm font-medium text-gray-900">لا توجد موردين</h3>
                                    <p className="mt-1 text-sm text-gray-500">ابدأ بإضافة مورد جديد</p>
                                    <div className="mt-6">
                                        <a
                                            href="/headquarters/suppliers/create"
                                            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                                        >
                                            <svg className="ml-2 -mr-1 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                            </svg>
                                            إضافة مورد جديد
                                        </a>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </HeadquartersLayout>
    );
}
