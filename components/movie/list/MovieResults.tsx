'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { ErrorMessage } from '@/components/common/feedback/ErrorMessage';
import { LoadingSpinner } from '@/components/common/loading/LoadingSpinner';
import { BackToTopFab } from '@/components/common/navigation/BackToTopFab';
import { useMovieStore } from '@/stores/movie-store';
import type { MovieState } from '@/stores/movie-store';
import { MovieList } from './MovieList';

const SCROLL_STORAGE_KEY = 'movie-results-scroll-position';

const MovieResults = () => {
    const {
        movies,
        currentPage,
        totalPages,
        isLoading,
        error,
        loadMoreMovies,
        hasMoviesForCurrentParams,
        fetchMovies,
        dedupeMovies,
    } = useMovieStore();

    type PersistHelpers = {
        rehydrate: () => Promise<void>;
        hasHydrated: () => boolean;
        onHydrate?: (callback: (state: MovieState) => void) => (() => void) | void;
        onFinishHydration?: (callback: (state: MovieState) => void) => (() => void) | void;
    };

    const movieStorePersist = (useMovieStore as typeof useMovieStore & { persist?: PersistHelpers })
        .persist;

    const sentinelRef = useRef<HTMLDivElement | null>(null);
    const hasRestoredScrollRef = useRef(false);
    const [autoLoadEnabled, setAutoLoadEnabled] = useState(false);
    const [hasHydrated, setHasHydrated] = useState(false);

    const displayMovies = useMemo(
        () =>
            movies ? Array.from(new Map(movies.map((movie) => [movie.id, movie])).values()) : [],
        [movies],
    );
    const movieCount = displayMovies.length;
    const hasMorePages = currentPage < totalPages;

    useEffect(() => {
        if (typeof window === 'undefined') return;

        if (!movieStorePersist) {
            setHasHydrated(true);
            return;
        }

        const unsubscribeFinish = movieStorePersist.onFinishHydration?.((state) => {
            state.dedupeMovies();
            setHasHydrated(true);
        });

        // Immediate check if already hydrated
        if (movieStorePersist.hasHydrated()) {
            dedupeMovies();
            setHasHydrated(true);
        }

        return () => {
            unsubscribeFinish?.();
        };
    }, [dedupeMovies, movieStorePersist]);

    useEffect(() => {
        if (!hasHydrated) return;
        if (!hasMoviesForCurrentParams()) {
            fetchMovies();
        }
    }, [hasHydrated, hasMoviesForCurrentParams, fetchMovies]);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const saveScroll = () => {
            const scrollY = Math.max(0, Math.round(window.scrollY));
            if (scrollY <= 0) {
                sessionStorage.removeItem(SCROLL_STORAGE_KEY);
                return;
            }
            sessionStorage.setItem(SCROLL_STORAGE_KEY, String(scrollY));
        };

        window.addEventListener('beforeunload', saveScroll);
        window.addEventListener('pagehide', saveScroll);

        return () => {
            saveScroll();
            window.removeEventListener('beforeunload', saveScroll);
            window.removeEventListener('pagehide', saveScroll);
        };
    }, []);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        if (!hasHydrated) return;
        if (hasRestoredScrollRef.current) return;

        const stored = sessionStorage.getItem(SCROLL_STORAGE_KEY);
        if (!stored) {
            hasRestoredScrollRef.current = true;
            setAutoLoadEnabled(true);
            return;
        }

        const scrollY = Number(stored);
        if (Number.isNaN(scrollY)) {
            sessionStorage.removeItem(SCROLL_STORAGE_KEY);
            hasRestoredScrollRef.current = true;
            setAutoLoadEnabled(true);
            return;
        }

        requestAnimationFrame(() => {
            window.scrollTo({ top: scrollY });
            sessionStorage.removeItem(SCROLL_STORAGE_KEY);
            hasRestoredScrollRef.current = true;
            // Auto-load bleibt deaktiviert bis Nutzer interagiert
        });
    }, [hasHydrated, movieCount]);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        if (autoLoadEnabled) return;

        const enable = () => setAutoLoadEnabled(true);

        window.addEventListener('pointerdown', enable, { once: true });
        window.addEventListener('wheel', enable, { once: true });
        window.addEventListener('keydown', enable, { once: true });
        window.addEventListener('touchstart', enable, { once: true });

        return () => {
            window.removeEventListener('pointerdown', enable);
            window.removeEventListener('wheel', enable);
            window.removeEventListener('keydown', enable);
            window.removeEventListener('touchstart', enable);
        };
    }, [autoLoadEnabled]);

    useEffect(() => {
        if (!hasHydrated) return;
        if (!hasMorePages) return;
        if (!hasRestoredScrollRef.current) return;
        if (!autoLoadEnabled) return;

        const sentinel = sentinelRef.current;
        if (!sentinel) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (!entry?.isIntersecting) return;
                if (!isLoading) {
                    void loadMoreMovies();
                }
            },
            {
                rootMargin: '200px 0px',
                threshold: 0.1,
            },
        );

        observer.observe(sentinel);

        return () => {
            observer.disconnect();
        };
    }, [autoLoadEnabled, hasHydrated, hasMorePages, isLoading, loadMoreMovies]);

    return (
        <div className="flex flex-col gap-6">
            {error && <ErrorMessage error={error} />}

            <MovieList
                movies={displayMovies}
                isLoading={
                    !hasHydrated ||
                    (isLoading && currentPage === 1) ||
                    (movieCount === 0 && !hasMoviesForCurrentParams())
                }
            />

            <div
                ref={sentinelRef}
                className="my-8 flex min-h-[3rem] items-center justify-center"
                aria-live="polite"
            >
                {hasMorePages && isLoading && currentPage > 1 && (
                    <div className="text-muted-foreground flex items-center gap-3 text-sm">
                        <LoadingSpinner size={28} />
                        <span>Loading more movies…</span>
                    </div>
                )}
            </div>

            <BackToTopFab />
        </div>
    );
};

export { MovieResults };
