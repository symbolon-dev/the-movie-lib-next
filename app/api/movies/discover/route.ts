import TMDBApi from '@/lib/api';
import { NextResponse } from 'next/server';

const api = await TMDBApi();

export async function GET() {
    try {
        const movies = await api.discoverMovies();
        return NextResponse.json(movies);
    } catch (error) {
        console.error('Error in discover route:', error);
        return NextResponse.json({ error: 'Failed to fetch movies' }, { status: 500 });
    }
}
