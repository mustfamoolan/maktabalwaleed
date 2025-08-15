import CustomersLayout from '@/Layouts/CustomersLayout';

export default function CustomersIndex() {
    return (
        <CustomersLayout title="مرحباً بكم في مكتبة الوليد">
            <div className="space-y-8">
                {/* Hero Section */}
                <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-lg text-white p-8 md:p-12">
                    <div className="max-w-3xl">
                        <h1 className="text-3xl md:text-4xl font-bold mb-4">
                            مكتبة الوليد
                        </h1>
                        <p className="text-indigo-100 text-lg mb-6">
                            وجهتك المثالية للحصول على أفضل الكتب والمراجع التعليمية والثقافية
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                                تصفح الكتالوج
                            </button>
                            <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-indigo-600 transition-colors">
                                تواصل معنا
                            </button>
                        </div>
                    </div>
                </div>

                {/* Featured Categories */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">الأقسام الرئيسية</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { name: 'الكتب الأكاديمية', icon: '📚', color: 'bg-blue-100 text-blue-600' },
                            { name: 'القرطاسية', icon: '✏️', color: 'bg-green-100 text-green-600' },
                            { name: 'المراجع العلمية', icon: '🔬', color: 'bg-purple-100 text-purple-600' },
                            { name: 'الأدب والثقافة', icon: '📖', color: 'bg-orange-100 text-orange-600' }
                        ].map((category, index) => (
                            <div key={index} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
                                <div className={`w-12 h-12 rounded-lg ${category.color} flex items-center justify-center text-2xl mb-4`}>
                                    {category.icon}
                                </div>
                                <h3 className="font-medium text-gray-900">{category.name}</h3>
                                <p className="text-gray-500 text-sm mt-1">تصفح المجموعة</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Stats */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">إحصائيات المكتبة</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-indigo-600 mb-2">1,500+</div>
                            <div className="text-gray-600">عنوان متاح</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-green-600 mb-2">500+</div>
                            <div className="text-gray-600">عميل راضي</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-purple-600 mb-2">50+</div>
                            <div className="text-gray-600">دار نشر</div>
                        </div>
                    </div>
                </div>

                {/* Services */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">خدماتنا</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <div className="flex items-start">
                                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                                    <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4-8-4m16 0v10l-8 4-8-4V7" />
                                    </svg>
                                </div>
                                <div className="mr-4">
                                    <h3 className="font-medium text-gray-900 mb-2">طلب وتوصيل</h3>
                                    <p className="text-gray-600 text-sm">خدمة طلب وتوصيل الكتب لجميع أنحاء المدينة</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <div className="flex items-start">
                                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                </div>
                                <div className="mr-4">
                                    <h3 className="font-medium text-gray-900 mb-2">طلبات مخصصة</h3>
                                    <p className="text-gray-600 text-sm">إمكانية طلب كتب غير متوفرة حالياً</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </CustomersLayout>
    );
}
