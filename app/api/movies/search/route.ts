import TMDBApi from '@/lib/api';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const api = await TMDBApi();
        const movies = await api.searchMovies('');
        return NextResponse.json(movies);
    } catch (error) {
        console.error('Error in search route:', error);
        return NextResponse.json({ error: 'Failed to fetch movies' }, { status: 500 });
    }
}
