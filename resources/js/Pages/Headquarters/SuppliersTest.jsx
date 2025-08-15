import React from 'react';
import { Head } from '@inertiajs/react';
import HeadquartersLayout from '@/Layouts/HeadquartersLayout';

export default function Suppliers({ suppliers, categories, filters }) {
    console.log('Suppliers data:', suppliers);
    console.log('Categories data:', categories);
    console.log('Filters data:', filters);

    return (
        <HeadquartersLayout>
            <Head title="إدارة الموردين" />

            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* العنوان */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                        <h1 className="text-2xl font-bold text-gray-900">إدارة الموردين</h1>
                        <p className="text-gray-600 mt-1">إدارة بيانات الموردين والشركات المتعاملة</p>

                        {/* Debug Info */}
                        <div className="mt-4 p-4 bg-gray-100 rounded">
                            <h3 className="font-bold">Debug Info:</h3>
                            <p>عدد الموردين: {suppliers?.data?.length || 0}</p>
                            <p>إجمالي الموردين: {suppliers?.total || 0}</p>
                            <p>عدد الفئات: {categories ? Object.keys(categories).length : 0}</p>

                            {suppliers?.data?.length > 0 && (
                                <div className="mt-2">
                                    <h4 className="font-semibold">أول مورد:</h4>
                                    <pre className="text-xs bg-white p-2 rounded mt-1">
                                        {JSON.stringify(suppliers.data[0], null, 2)}
                                    </pre>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* قائمة بسيطة للموردين */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">قائمة الموردين</h2>

                        {suppliers?.data?.length > 0 ? (
                            <div className="space-y-4">
                                {suppliers.data.map((supplier) => (
                                    <div key={supplier.id} className="border border-gray-200 rounded-lg p-4">
                                        <h3 className="font-semibold text-lg">{supplier.name}</h3>
                                        <p className="text-gray-600">{supplier.contact_person || 'غير محدد'}</p>
                                        <p className="text-gray-500">{supplier.phone || 'غير محدد'}</p>
                                        <p className="text-sm text-gray-400">
                                            الفئات: {supplier.product_categories?.join(', ') || 'غير محدد'}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <p className="text-gray-500">لا توجد موردين</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </HeadquartersLayout>
    );
}
