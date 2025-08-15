import { Head, Link } from '@inertiajs/react';

export default function HeadquartersLayout({ title, children }) {
    return (
        <div className="min-h-screen bg-gray-50" dir="rtl">
            <Head title={title} />

            {/* Top Navigation */}
            <nav className="bg-white shadow border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <div className="flex items-center">
                            <Link href="/headquarters" className="flex items-center">
                                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                </div>
                                <span className="mr-3 text-xl font-bold text-gray-900">
                                    المقر الرئيسي
                                </span>
                            </Link>
                        </div>

                        {/* User Menu */}
                        <div className="flex items-center space-x-4 space-x-reverse">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                <span className="text-blue-600 text-sm font-medium">إ</span>
                            </div>
                            <span className="text-gray-700 text-sm">الإدارة</span>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {title && (
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
                        </div>
                    )}
                    {children}
                </div>
            </main>
        </div>
    );
}
