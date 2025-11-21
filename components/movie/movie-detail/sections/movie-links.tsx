import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type MovieLinksProps = {
    homepage: string | null;
    imdbId: string | null;
    className?: string;
    buttonGroupClassName?: string;
};

export const MovieLinks = ({
    homepage,
    imdbId,
    className,
    buttonGroupClassName,
}: MovieLinksProps) => {
    if (!homepage && !imdbId) return null;

    return (
        <div className={cn('mt-8', className)}>
            <div
                className={cn('flex flex-col gap-3 sm:flex-row sm:flex-wrap', buttonGroupClassName)}
            >
                {homepage ? (
                    <Button asChild variant="outline-primary">
                        <a href={homepage} target="_blank" rel="noopener noreferrer">
                            Official Website
                        </a>
                    </Button>
                ) : null}

                {imdbId ? (
                    <Button asChild variant="outline-primary">
                        <a
                            href={`https://www.imdb.com/title/${imdbId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            IMDb
                        </a>
                    </Button>
                ) : null}
            </div>
        </div>
    );
};
