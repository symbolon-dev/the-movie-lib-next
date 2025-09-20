import { Badge } from '@/components/ui/badge';
import { MovieGenre } from '@/types/movie';

type MovieGenresProps = {
    genres: MovieGenre[];
};

export const MovieGenres = ({ genres }: MovieGenresProps) => {
    return (
        <div className="mb-6">
            <div className="flex flex-wrap gap-2">
                {genres.map((genre) => (
                    <Badge key={genre.id}>{genre.name}</Badge>
                ))}
            </div>
        </div>
    );
};
