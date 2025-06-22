import React from 'react';

import Button from './Button';

type PaginationProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
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

    const renderPageNumbers = () => {
        const maxVisiblePages = 5;

        let startPage = Math.max(1, currentPage - 2);
        const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        return Array.from({ length: endPage - startPage + 1 }, (_, index) => {
            const pageNumber = startPage + index;
            return (
                <Button
                    key={pageNumber}
                    onClick={() => onPageChange(pageNumber)}
                    className={`flex size-10 items-center justify-center p-0 ${
                        pageNumber === currentPage
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                    }`}
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
                className={`${
                    currentPage <= 1
                        ? 'cursor-not-allowed bg-gray-600 text-gray-400'
                        : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                }`}
                aria-label="Previous page"
            >
                Previous
            </Button>

            {renderPageNumbers()}

            <Button
                onClick={handleNext}
                disabled={currentPage >= totalPages}
                className={`${
                    currentPage >= totalPages
                        ? 'cursor-not-allowed bg-gray-600 text-gray-400'
                        : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                }`}
                aria-label="Next page"
            >
                Next
            </Button>
        </div>
    );
};

export default Pagination;
