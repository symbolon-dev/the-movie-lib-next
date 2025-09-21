import { Button } from '@/components/ui/button';

type MovieLinksProps = {
    homepage: string | undefined;
    imdbId: string | undefined;
};

export const MovieLinks = ({ homepage, imdbId }: MovieLinksProps) => {
    if (!homepage && !imdbId) return undefined;

    return (
        <div className="mt-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
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
