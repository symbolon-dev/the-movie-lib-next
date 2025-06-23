import React from 'react';

type EmptyStateProps = {
    title: string;
    message: string;
    className?: string;
};

const EmptyState = ({ title, message, className = '' }: EmptyStateProps) => {
    return (
        <div className={`flex size-full flex-col items-center justify-center rounded-lg border border-gray-700 bg-gray-800 p-8 ${className}`}>
            <h2 className="text-xl font-bold text-gray-300">{title}</h2>
            <p className="mt-2 text-gray-400">{message}</p>
        </div>
    );
};

export default EmptyState;
