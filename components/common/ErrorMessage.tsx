'use client';

import React from 'react';

type ErrorMessageProps = {
    error: string;
};

const ErrorMessage = ({ error }: ErrorMessageProps) => {
    if (!error) return null;

    return (
        <div className="my-4 rounded-md border border-red-500 bg-red-500/10 p-4">
            <p className="text-sm font-medium text-red-500">{error}</p>
        </div>
    );
};

export default ErrorMessage;
