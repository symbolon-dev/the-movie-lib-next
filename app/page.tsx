import MovieFilter from '@/components/filter/MovieFilter';
import MovieResults from '@/components/movie/MovieResults';

export const dynamic = 'force-dynamic';

const Home = async () => {
    return (
        <div className="my-8 grid grid-cols-1 gap-6 md:grid-cols-[300px_1fr]">
            <MovieFilter />
            <MovieResults />
        </div>
    );
};

export default Home;
