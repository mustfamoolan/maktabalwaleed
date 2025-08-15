import { Head, Link } from '@inertiajs/react';

export default function RepresentativesLayout({ title, children }) {
    return (
        <div className="min-h-screen bg-gray-50" dir="rtl">
            <Head title={title} />

            {/* Top Navigation */}
            <nav className="bg-white shadow border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <div className="flex items-center">
                            <Link href="/representatives" className="flex items-center">
                                <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <span className="mr-3 text-xl font-bold text-gray-900">
                                    المندوبين
                                </span>
                            </Link>
                        </div>

                        {/* User Menu */}
                        <div className="flex items-center space-x-4 space-x-reverse">
                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                <span className="text-green-600 text-sm font-medium">م</span>
                            </div>
                            <span className="text-gray-700 text-sm">مندوب</span>
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
