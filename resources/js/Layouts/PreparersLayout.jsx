import { Head, Link } from '@inertiajs/react';

export default function PreparersLayout({ title, children }) {
    return (
        <div className="min-h-screen bg-gray-50" dir="rtl">
            <Head title={title} />

            {/* Top Navigation */}
            <nav className="bg-white shadow border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <div className="flex items-center">
                            <Link href="/preparers" className="flex items-center">
                                <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                    </svg>
                                </div>
                                <span className="mr-3 text-xl font-bold text-gray-900">
                                    المجهزين
                                </span>
                            </Link>
                        </div>

                        {/* User Menu */}
                        <div className="flex items-center space-x-4 space-x-reverse">
                            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                                <span className="text-purple-600 text-sm font-medium">ج</span>
                            </div>
                            <span className="text-gray-700 text-sm">مجهز</span>
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
