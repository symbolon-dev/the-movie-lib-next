import { MovieFilterWithSkeleton } from '@/components/movie/filter/MovieFilterWithSkeleton';
import { MovieResults } from '@/components/movie/list/MovieResults';

export const dynamic = 'force-dynamic';

const Home = async () => {
    return (
        <div className="flex flex-col gap-8 pt-6 pb-12">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] xl:grid-cols-[minmax(0,360px)_minmax(0,1fr)]">
                <section id="filters" className="lg:sticky lg:top-28">
                    <MovieFilterWithSkeleton />
                </section>

                <section id="results">
                    <MovieResults />
                </section>
            </div>
        </div>
    );
};

export default Home;
