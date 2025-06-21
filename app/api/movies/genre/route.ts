import TMDBApi from '@/lib/api';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const api = await TMDBApi();
        const movies = await api.fetchMovieGenres();
        return NextResponse.json(movies);
    } catch (error) {
        console.error('Error in genre route:', error);
        return NextResponse.json({ error: 'Failed to fetch genres' }, { status: 500 });
    }
}
