import Badge from '@/components/shared/ui/Badge';
import { MovieGenre } from '@/types/movie';

type MovieGenresProps = {
    genres: MovieGenre[];
};

const MovieGenres = ({ genres }: MovieGenresProps) => {
    return (
        <div className="mb-6">
            <div className="flex flex-wrap gap-2">
                {genres.map((genre) => (
                    <Badge
                        key={genre.id}
                        className="bg-blue-600 text-white"
                    >
                        {genre.name}
                    </Badge>
                ))}
            </div>
        </div>
    );
};

export default MovieGenres;
