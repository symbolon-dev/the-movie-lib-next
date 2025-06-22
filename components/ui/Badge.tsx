import { ReactNode } from 'react';

type BadgeProps = {
    children: ReactNode;
    className?: string;
    [key: string]: unknown;
};

const Badge = ({ children, className = '', ...props }: BadgeProps) => (
    <span
        className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${className}`}
        {...props}
    >
        {children}
    </span>
);

export default Badge;
