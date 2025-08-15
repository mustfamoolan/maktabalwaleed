import { useForm } from '@inertiajs/react';

export default function FormField({
    label,
    name,
    type = 'text',
    required = false,
    placeholder = '',
    options = [],
    rows = 3,
    value,
    onChange,
    error
}) {
    const renderInput = () => {
        const commonProps = {
            className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
            value: value || '',
            onChange: onChange,
            placeholder,
            required
        };

        switch (type) {
            case 'select':
                return (
                    <select {...commonProps}>
                        <option value="">اختر...</option>
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                );

            case 'textarea':
                return (
                    <textarea {...commonProps} rows={rows} />
                );

            default:
                return (
                    <input {...commonProps} type={type} />
                );
        }
    };

    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
                {label}
                {required && <span className="text-red-500 mr-1">*</span>}
            </label>
            {renderInput()}
            {error && (
                <p className="text-sm text-red-600">{error}</p>
            )}
        </div>
    );
}
