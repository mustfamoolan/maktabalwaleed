import { Head } from '@inertiajs/react';

export default function GuestLayout({ children, title = 'مكتبة الوليد' }) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <Head title={title} />

            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
                <div className="absolute inset-0 bg-gray-900" style={{
                    backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.15) 1px, transparent 0)',
                    backgroundSize: '20px 20px'
                }}></div>
            </div>

            {/* المحتوى الرئيسي */}
            <div className="relative min-h-screen">
                {children}
            </div>
        </div>
    );
}
