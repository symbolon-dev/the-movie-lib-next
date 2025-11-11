import { Calendar, Clock } from 'lucide-react';

import { cn } from '@/lib/utils';
import { formatDate, formatRuntime } from '@/utils/formatter';

type MovieMetadataProps = {
    releaseDate: string;
    runtime: number | undefined;
    className?: string;
    iconClassName?: string;
    valueClassName?: string;
};

export const MovieMetadata = ({
    releaseDate,
    runtime,
    className,
    iconClassName,
    valueClassName,
}: MovieMetadataProps) => (
    <div
        className={cn(
            'flex flex-wrap items-center gap-x-4 gap-y-2 text-sm sm:text-base',
            className,
        )}
    >
        <div className="flex items-center gap-1">
            <Calendar className={cn('text-muted-foreground h-4 w-4', iconClassName)} />
            <span className={cn('font-medium', valueClassName)}>{formatDate(releaseDate)}</span>
        </div>

        {runtime && runtime > 0 ? (
            <div className="flex items-center gap-1">
                <Clock className={cn('text-muted-foreground h-4 w-4', iconClassName)} />
                <span className={cn('font-medium', valueClassName)}>{formatRuntime(runtime)}</span>
            </div>
        ) : null}
    </div>
);
