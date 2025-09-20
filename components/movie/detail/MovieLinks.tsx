import { Button } from '@/components/ui/button';

type MovieLinksProps = {
    homepage: string | undefined;
    imdbId: string | undefined;
};

export const MovieLinks = ({ homepage, imdbId }: MovieLinksProps) => {
    if (!homepage && !imdbId) return undefined;

    return (
        <div className="mt-8">
            <div className="flex gap-3">
                {homepage && (
                    <Button asChild>
                        <a
                            href={homepage}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Official Website
                        </a>
                    </Button>
                )}

                {imdbId && (
                    <Button asChild variant="secondary">
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
