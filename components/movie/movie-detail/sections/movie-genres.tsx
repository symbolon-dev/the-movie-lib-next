import { Badge, type BadgeProps } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { MovieGenre } from '@/types/movie';

type MovieGenresProps = {
    genres: MovieGenre[];
    className?: string;
    badgeClassName?: string;
    badgeVariant?: BadgeProps['variant'];
};

export const MovieGenres = ({
    genres,
    className,
    badgeClassName,
    badgeVariant,
}: MovieGenresProps) => (
    <div className={cn('mb-6', className)}>
        <div className="flex flex-wrap justify-center gap-2 md:justify-start">
            {genres.map((genre) => (
                <Badge
                    key={genre.id}
                    className={badgeClassName}
                    variant={badgeVariant}
                >
                    {genre.name}
                </Badge>
            ))}
        </div>
    </div>
);
