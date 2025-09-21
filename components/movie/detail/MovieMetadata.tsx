import { Calendar, Clock } from 'lucide-react';
import { formatDate, formatRuntime } from '@/utils/formatter';

type MovieMetadataProps = {
    releaseDate: string;
    runtime: number | undefined;
};

const MovieMetadata = ({ releaseDate, runtime }: MovieMetadataProps) => {
    return (
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm sm:text-base">
            <div className="flex items-center gap-1">
                <Calendar className="text-muted-foreground h-4 w-4" />
                <span className="font-medium">{formatDate(releaseDate)}</span>
            </div>

            {runtime && runtime > 0 && (
                <div className="flex items-center gap-1">
                    <Clock className="text-muted-foreground h-4 w-4" />
                    <span className="font-medium">{formatRuntime(runtime)}</span>
                </div>
            )}
        </div>
    );
};

export { MovieMetadata };
