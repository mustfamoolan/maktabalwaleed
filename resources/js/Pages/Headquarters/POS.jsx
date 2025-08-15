import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import HeadquartersLayout from '@/Layouts/HeadquartersLayout';

export default function POS() {
    const [cart, setCart] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // Mock data for products
    const products = [
        { id: 1, name: 'كتاب التاريخ الإسلامي', price: 45000, category: 'books', stock: 25, barcode: '1001' },
        { id: 2, name: 'دفتر 200 ورقة', price: 12000, category: 'notebooks', stock: 100, barcode: '1002' },
        { id: 3, name: 'قلم حبر أزرق', price: 3000, category: 'pens', stock: 200, barcode: '1003' },
        { id: 4, name: 'آلة حاسبة علمية', price: 85000, category: 'calculators', stock: 15, barcode: '1004' },
        { id: 5, name: 'كتاب الرياضيات', price: 38000, category: 'books', stock: 30, barcode: '1005' },
        { id: 6, name: 'مجموعة أقلام ملونة', price: 25000, category: 'pens', stock: 50, barcode: '1006' },
        { id: 7, name: 'دفتر رسم A4', price: 18000, category: 'notebooks', stock: 40, barcode: '1007' },
        { id: 8, name: 'مسطرة 30 سم', price: 5000, category: 'tools', stock: 80, barcode: '1008' }
    ];

    const categories = [
        { id: 'all', name: 'جميع المنتجات', icon: 'M4 6h16M4 10h16M4 14h16M4 18h16' },
        { id: 'books', name: 'الكتب', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
        { id: 'notebooks', name: 'الدفاتر', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
        { id: 'pens', name: 'الأقلام', icon: 'M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z' },
        { id: 'calculators', name: 'الآلات الحاسبة', icon: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z' },
        { id: 'tools', name: 'الأدوات', icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM7 3H5v12a2 2 0 104 0V3z' }
    ];

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             product.barcode.includes(searchTerm);
        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const addToCart = (product) => {
        const existingItem = cart.find(item => item.id === product.id);
        if (existingItem) {
            setCart(cart.map(item =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            ));
        } else {
            setCart([...cart, { ...product, quantity: 1 }]);
        }
    };

    const removeFromCart = (productId) => {
        setCart(cart.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity <= 0) {
            removeFromCart(productId);
        } else {
            setCart(cart.map(item =>
                item.id === productId
                    ? { ...item, quantity: newQuantity }
                    : item
            ));
        }
    };

    const getTotalAmount = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const clearCart = () => {
        setCart([]);
    };

    const formatTime = (date) => {
        return date.toLocaleTimeString('ar-SA', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <HeadquartersLayout>
            <Head title="نقطة البيع - المقر الرئيسي" />

            <div className="p-4 h-[calc(100vh-56px)]">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-full">
                    {/* Products Section */}
                    <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 overflow-hidden h-full">
                        <div className="p-4 border-b border-gray-200">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-bold text-gray-900">المنتجات</h2>
                                <div className="text-lg font-semibold text-blue-600">
                                    {formatTime(currentTime)}
                                </div>
                            </div>

                        {/* Search Bar */}
                        <div className="relative mb-4">
                            <input
                                type="text"
                                placeholder="البحث بالاسم أو الباركود..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            <svg className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>

                        {/* Category Filters */}
                        <div className="flex flex-wrap gap-2">
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => setSelectedCategory(category.id)}
                                    className={`flex items-center space-x-2 space-x-reverse px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                        selectedCategory === category.id
                                            ? 'bg-blue-500 text-white shadow-md'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={category.icon} />
                                    </svg>
                                    <span>{category.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Products Grid */}
                    <div className="p-4 overflow-y-auto" style={{ height: 'calc(100% - 180px)' }}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                            {filteredProducts.map((product) => (
                                <div
                                    key={product.id}
                                    onClick={() => addToCart(product)}
                                    className="bg-gray-50 rounded-lg p-4 hover:bg-blue-50 hover:border-blue-200 border border-gray-200 cursor-pointer transition-all duration-200 transform hover:scale-105"
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="font-semibold text-gray-900 text-sm">{product.name}</h3>
                                        <span className="text-xs text-gray-500">#{product.barcode}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="text-lg font-bold text-blue-600">
                                            {product.price.toLocaleString()} د.ع
                                        </div>
                                        <div className={`text-xs px-2 py-1 rounded-full ${
                                            product.stock > 20 ? 'bg-green-100 text-green-700' :
                                            product.stock > 5 ? 'bg-orange-100 text-orange-700' :
                                            'bg-red-100 text-red-700'
                                        }`}>
                                            متوفر: {product.stock}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Cart Section */}
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden h-full">
                    <div className="p-4 border-b border-gray-200 bg-blue-50">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-gray-900">السلة</h2>
                            {cart.length > 0 && (
                                <button
                                    onClick={clearCart}
                                    className="text-red-600 hover:text-red-700 text-sm font-medium"
                                >
                                    مسح الكل
                                </button>
                            )}
                        </div>
                        <div className="mt-2 text-sm text-gray-600">
                            {cart.length} منتج في السلة
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto" style={{ height: 'calc(100% - 240px)' }}>
                        {cart.length === 0 ? (
                            <div className="p-6 text-center text-gray-500">
                                <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.6 8M7 13v8a2 2 0 002 2h6a2 2 0 002-2v-8m-8 0V9a2 2 0 012-2h4a2 2 0 012 2v4.01" />
                                </svg>
                                <p>السلة فارغة</p>
                                <p className="text-xs mt-1">اضغط على المنتج لإضافته</p>
                            </div>
                        ) : (
                            <div className="p-4 space-y-3">
                                {cart.map((item) => (
                                    <div key={item.id} className="bg-gray-50 rounded-lg p-3">
                                        <div className="flex items-center justify-between mb-2">
                                            <h4 className="font-medium text-gray-900 text-sm">{item.name}</h4>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-2 space-x-reverse">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                                    </svg>
                                                </button>
                                                <span className="w-8 text-center font-semibold">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                    </svg>
                                                </button>
                                            </div>
                                            <div className="text-blue-600 font-bold">
                                                {(item.price * item.quantity).toLocaleString()} د.ع
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Cart Total and Checkout */}
                    {cart.length > 0 && (
                        <div className="p-4 border-t border-gray-200 bg-gray-50">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between text-lg font-bold">
                                    <span>الإجمالي:</span>
                                    <span className="text-blue-600">{getTotalAmount().toLocaleString()} د.ع</span>
                                </div>

                                <div className="space-y-2">
                                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200">
                                        إتمام البيع
                                    </button>
                                    <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg transition-colors duration-200">
                                        حفظ كمسودة
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            </div>
        </HeadquartersLayout>
    );
}
