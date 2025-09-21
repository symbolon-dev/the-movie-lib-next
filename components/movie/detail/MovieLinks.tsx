import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type MovieLinksProps = {
    homepage: string | undefined;
    imdbId: string | undefined;
    className?: string;
    buttonGroupClassName?: string;
};

const MovieLinks = ({ homepage, imdbId, className, buttonGroupClassName }: MovieLinksProps) => {
    if (!homepage && !imdbId) return undefined;

    return (
        <div className={cn('mt-8', className)}>
            <div className={cn('flex flex-col gap-3 sm:flex-row sm:flex-wrap', buttonGroupClassName)}>
                {homepage && (
                    <Button asChild variant="outline-primary">
                        <a href={homepage} target="_blank" rel="noopener noreferrer">
                            Official Website
                        </a>
                    </Button>
                )}

                {imdbId && (
                    <Button asChild variant="outline-primary">
                        <a
                            href={`https://www.imdb.com/title/${imdbId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            IMDb
                        </a>
                    </Button>
                )}
            </div>
        </div>
    );
};

export { MovieLinks };
