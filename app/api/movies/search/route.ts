import TMDBApi from '@/lib/api';
import { NextResponse } from 'next/server';

const api = await TMDBApi();

export async function GET() {
    try {
        const movies = await api.searchMovies('');
        return NextResponse.json(movies);
    } catch (error) {
        console.error('Error in search route:', error);
        return NextResponse.json({ error: 'Failed to fetch movies' }, { status: 500 });
    }
}
