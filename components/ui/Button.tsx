import { ReactNode } from 'react';

type ButtonProps = {
    className?: string;
    children: ReactNode;
    [key: string]: unknown;
};

const Button = ({ className = "", children, ...props }: ButtonProps) => (
    <button
        className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 ${className}`}
        {...props}
    >
        {children}
    </button>
);

export default Button;
