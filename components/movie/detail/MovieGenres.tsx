import { Badge } from '@/components/ui/badge';
import { MovieGenre } from '@/types/movie';

type MovieGenresProps = {
    genres: MovieGenre[];
};

const MovieGenres = ({ genres }: MovieGenresProps) => {
    return (
        <div className="mb-6">
            <div className="flex flex-wrap justify-center gap-2 md:justify-start">
                {genres.map((genre) => (
                    <Badge key={genre.id}>{genre.name}</Badge>
                ))}
            </div>
        </div>
    );
};

export { MovieGenres };
