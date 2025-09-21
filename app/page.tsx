import { MovieFilterWithSkeleton } from '@/components/movie/filter/MovieFilterWithSkeleton';
import { MovieResults } from '@/components/movie/list/MovieResults';

export const dynamic = 'force-dynamic';

const Home = async () => {
    return (
        <div className="my-8 grid grid-cols-1 gap-6 md:grid-cols-[350px_1fr] md:items-start">
            <MovieFilterWithSkeleton />
            <MovieResults />
        </div>
    );
};

export default Home;
