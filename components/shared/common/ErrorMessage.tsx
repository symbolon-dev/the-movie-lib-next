'use client';

import { Info } from 'lucide-react';
import Link from 'next/link';

type ErrorMessageProps = {
    error: string;
    fullPage?: boolean;
    title?: string;
    actionLink?: string;
    actionText?: string;
};

const ErrorMessage = ({ error, fullPage = false, title = "Error", actionLink = "/", actionText = "Back to Home" }: ErrorMessageProps) => {
    if (!error) return undefined;

    if (!fullPage) {
        return (
            <div className="my-4 rounded-md border border-red-500 bg-red-500/10 p-4">
                <p className="text-sm font-medium text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-black to-gray-900">
            <div className="max-w-md rounded-lg bg-gray-800 p-8 text-center shadow-xl">
                <Info className="mx-auto mb-4 h-16 w-16 text-red-500" />
                <h2 className="mb-2 text-2xl font-bold text-white">{title}</h2>
                <p className="mb-6 text-gray-300">
                    {error || "There was an error loading the data."}
                </p>
                <Link
                    href={actionLink}
                    className="inline-block rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700"
                >
                    {actionText}
                </Link>
            </div>
        </div>
    );
};

export default ErrorMessage;
