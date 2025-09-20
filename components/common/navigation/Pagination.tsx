import { Button } from '@/components/ui/button';

type PaginationProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

export const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    const pageNumberButtons = () => {
        const MAX_VISIBLE_PAGES = 5;

        let startPage = Math.max(1, currentPage - 2);
        const endPage = Math.min(totalPages, startPage + MAX_VISIBLE_PAGES - 1);

        if (endPage - startPage + 1 < MAX_VISIBLE_PAGES) {
            startPage = Math.max(1, endPage - MAX_VISIBLE_PAGES + 1);
        }

        return Array.from({ length: endPage - startPage + 1 }, (_, index) => {
            const pageNumber = startPage + index;
            return (
                <Button
                    key={pageNumber}
                    onClick={() => onPageChange(pageNumber)}
                    variant={pageNumber === currentPage ? 'default' : 'secondary'}
                    className="flex size-10 items-center justify-center p-0"
                    aria-current={pageNumber === currentPage ? 'page' : undefined}
                >
                    {pageNumber}
                </Button>
            );
        });
    };

    return (
        <div className="my-8 flex flex-wrap items-center justify-center gap-2">
            <Button
                onClick={handlePrevious}
                disabled={currentPage <= 1}
                variant="secondary"
                aria-label="Previous page"
            >
                Previous
            </Button>

            {pageNumberButtons()}

            <Button
                onClick={handleNext}
                disabled={currentPage >= totalPages}
                variant="secondary"
                aria-label="Next page"
            >
                Next
            </Button>
        </div>
    );
};
