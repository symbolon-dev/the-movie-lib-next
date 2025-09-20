import { MovieFilter } from '@/components/movie/filter/MovieFilter';
import { MovieResults } from '@/components/movie/list/MovieResults';

export const dynamic = 'force-dynamic';

const Home = async () => {
    return (
        <div className="my-8 grid grid-cols-1 gap-6 md:grid-cols-[350px_1fr] md:items-start">
            <MovieFilter />
            <MovieResults />
        </div>
    );
};

export default Home;
