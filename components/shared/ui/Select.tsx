import { ChangeEvent } from 'react';

type SelectOption = {
    value: string | number;
    label: string;
};

type SelectProps = {
    options: SelectOption[];
    value?: SelectOption | undefined;
    onChange: (option: SelectOption | undefined) => void;
    label?: string;
    error?: string;
    className?: string;
    [key: string]: unknown;
};

const Select = ({
    options,
    value,
    onChange,
    label,
    error,
    className = '',
    ...props
}: SelectProps) => {
    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const selected = options.find((opt) => opt.value.toString() === e.target.value);
        onChange(selected ?? undefined);
    };

    return (
        <div className="w-full">
            {label && (
                <label className="mb-2 block text-sm font-medium text-gray-700">{label}</label>
            )}
            <select
                value={value?.value ?? ''}
                onChange={handleChange}
                className={`w-full rounded-md border border-gray-300 px-4 py-2 text-gray-800 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 ${error ? 'border-red-500 focus:ring-red-500' : ''} ${className}`}
                {...props}
            >
                <option disabled value="">
                    Please select
                </option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    );
};

export default Select;
