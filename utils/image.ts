const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

type PosterSize
    = | 'w92'
        | 'w154'
        | 'w185'
        | 'w342'
        | 'w500'
        | 'w780'
        | 'original';

type BackdropSize = 'w300' | 'w780' | 'w1280' | 'original';

function getImageUrl(path: string | null, size: string): string {
    if (path == null) {
        return '';
    }

    return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
}

export function getMoviePosterUrl(path: string | null, size: PosterSize = 'w500'): string {
    return getImageUrl(path, size);
}

export function getMovieBackdropUrl(path: string | null, size: BackdropSize = 'original'): string {
    return getImageUrl(path, size);
}
