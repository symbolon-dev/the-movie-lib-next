import React from 'react';

type RatingDisplayProps = {
    score: number;
    maxScore?: number;
    showPercentage?: boolean;
    showCount?: boolean;
    count?: number;
    size?: 'sm' | 'lg';
    className?: string;
};

export const RatingDisplay = ({
    score,
    maxScore = 10,
    showPercentage = false,
    showCount = false,
    count = 0,
    size = 'lg',
    className = '',
}: RatingDisplayProps) => {
    const normalizedScore = showPercentage ? Math.round((score / maxScore) * 100) : score;
    const displayValue = showPercentage ? `${normalizedScore}%` : normalizedScore.toFixed(1);

    const getRatingColor = () => {
        const percentage = (score / maxScore) * 100;
        if (percentage >= 70) return 'bg-green-500 border-green-500';
        if (percentage >= 50) return 'bg-yellow-500 border-yellow-500';
        return 'bg-red-500 border-red-500';
    };

    const sizeClasses = {
        sm: 'size-10 text-xs',
        lg: 'size-16 text-lg',
    };

    return (
        <div className={`flex items-center ${className}`}>
            <div
                className={`flex items-center justify-center rounded-full ${sizeClasses[size]} ${getRatingColor()}`}
            >
                <span className="font-bold text-white">{displayValue}</span>
            </div>
            {showCount && count > 0 && (
                <span className="text-muted-foreground ml-2 text-sm">({count} votes)</span>
            )}
        </div>
    );
};
