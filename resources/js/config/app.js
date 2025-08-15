// تكوين التطبيق
export const appConfig = {
    name: 'مكتبة الوليد',
    version: '1.0.0',
    locale: 'ar',
    direction: 'rtl',
    theme: {
        primary: '#3B82F6',
        secondary: '#6B7280',
        success: '#10B981',
        warning: '#F59E0B',
        danger: '#EF4444'
    }
};

// مساعدات للتاريخ والوقت
export const formatDate = (date, options = {}) => {
    return new Date(date).toLocaleDateString('ar-SA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        ...options
    });
};

// مساعدات للأرقام
export const formatNumber = (number) => {
    return new Intl.NumberFormat('ar-SA').format(number);
};

export const formatCurrency = (amount, currency = 'SAR') => {
    return new Intl.NumberFormat('ar-SA', {
        style: 'currency',
        currency: currency
    }).format(amount);
};
