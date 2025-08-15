export default function Button({
    children,
    type = 'button',
    variant = 'primary',
    size = 'md',
    disabled = false,
    loading = false,
    onClick,
    className = '',
    ...props
}) {
    const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';

    const variants = {
        primary: 'bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white focus:ring-blue-500',
        secondary: 'bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 text-gray-900 focus:ring-gray-500',
        danger: 'bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white focus:ring-red-500',
        success: 'bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white focus:ring-green-500',
        outline: 'border border-gray-300 bg-white hover:bg-gray-50 disabled:bg-gray-50 text-gray-700 focus:ring-gray-500'
    };

    const sizes = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-sm',
        lg: 'px-6 py-3 text-base'
    };

    const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

    return (
        <button
            type={type}
            disabled={disabled || loading}
            onClick={onClick}
            className={classes}
            {...props}
        >
            {loading && (
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            )}
            {children}
        </button>
    );
}
