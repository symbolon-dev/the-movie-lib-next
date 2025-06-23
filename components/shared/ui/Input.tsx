type InputProps = {
    label?: string;
    error?: string;
    className?: string;
    [key: string]: unknown;
};

const Input = ({ label, error, className = '', ...props }: InputProps) => (
    <div className="w-full">
        {label && (
            <label
                htmlFor={props.id as string}
                className="mb-2 block text-sm font-medium text-gray-700"
            >
                {label}
            </label>
        )}
        <input
            className={`w-full rounded-md border border-gray-300 px-4 py-2 text-gray-800 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:opacity-50 ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''} ${className}`}
            {...props}
        />
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
);
export default Input;
