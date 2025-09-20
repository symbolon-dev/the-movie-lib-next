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
                    <a
                        href={homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-md bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700"
                    >
                        Official Website
                    </a>
                )}

                {imdbId && (
                    <a
                        href={`https://www.imdb.com/title/${imdbId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-md bg-yellow-600 px-6 py-2 font-semibold text-black transition-colors hover:bg-yellow-700"
                    >
                        IMDb
                    </a>
                )}
            </div>
        </div>
    );
};
