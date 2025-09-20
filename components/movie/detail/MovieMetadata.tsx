import { Clock } from 'lucide-react';
import { formatDate, formatRuntime } from '@/utils/formatter';

type MovieMetadataProps = {
    releaseDate: string;
    runtime: number | undefined;
};

export const MovieMetadata = ({ releaseDate, runtime }: MovieMetadataProps) => {
    return (
        <>
            <div className="flex items-center gap-2">
                <span className="text-muted-foreground font-semibold">Release: </span>
                <span>{formatDate(releaseDate)}</span>
            </div>

            {runtime && runtime > 0 && (
                <div className="flex items-center gap-2">
                    <Clock className="text-muted-foreground h-4 w-4" />
                    <span>{formatRuntime(runtime)}</span>
                </div>
            )}
        </>
    );
};
