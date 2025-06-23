const TMDB_IMAGE_BASE_URL = process.env.TMDB_IMAGE_BASE_URL || 'https://image.tmdb.org/t/p';

export type PosterSize = 'w92' | 'w154' | 'w185' | 'w342' | 'w500' | 'w780' | 'original';

export type BackdropSize = 'w300' | 'w780' | 'w1280' | 'original';

const getImageUrl = (path: string | undefined | null, size: string): string => {
    if (!path) {
        return '';
    }

    return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
};

export const getMoviePosterUrl = (
    path: string | undefined | null,
    size: PosterSize = 'w500',
): string => {
    return getImageUrl(path, size);
};

export const getMovieBackdropUrl = (
    path: string | undefined | null,
    size: BackdropSize = 'original',
): string => {
    return getImageUrl(path, size);
};
