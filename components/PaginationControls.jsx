import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PaginationControls = ({
    page,
    totalPages,
    loading,
    setPage,
    totalCount,
}) => {
    const handlePreviousPage = () => {
        setPage((prev) => Math.max(1, prev - 1));
    };

    const handleNextPage = () => {
        setPage((prev) => Math.min(totalPages, prev + 1));
    };

    const renderPageNumbers = () => {
        const pages = [];
        const pageBuffer = 2;

        pages.push(
            <Button
                key={1}
                variant={page === 1 ? "default" : "outline"}
                size="sm"
                onClick={() => setPage(1)}
                className="w-8 h-8 p-0"
                disabled={loading}
            >
                1
            </Button>
        );

        let startPage = Math.max(2, page - pageBuffer);
        let endPage = Math.min(totalPages - 1, page + pageBuffer);

        if (startPage > 2) {
            pages.push(
                <span key="ellipsis-1" className="px-2 text-muted-foreground">
                    ...
                </span>
            );
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <Button
                    key={i}
                    variant={page === i ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPage(i)}
                    className="w-8 h-8 p-0"
                    disabled={loading}
                >
                    {i}
                </Button>
            );
        }

        if (endPage < totalPages - 1) {
            pages.push(
                <span key="ellipsis-2" className="px-2 text-muted-foreground">
                    ...
                </span>
            );
        }

        if (totalPages > 1) {
            pages.push(
                <Button
                    key={totalPages}
                    variant={page === totalPages ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPage(totalPages)}
                    className="w-8 h-8 p-0"
                    disabled={loading}
                >
                    {totalPages}
                </Button>
            );
        }

        return pages;
    };

    return (
        <div className="flex items-center justify-between px-6 py-4 border-t border-neutral-200/50 dark:border-neutral-800/50">
            <div className="text-sm text-muted-foreground">
                {(page - 1) * 10 + 1}-{Math.min(page * 10, totalCount)} of{" "}
                {totalCount} PRs
            </div>
            <div className="flex items-center gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePreviousPage}
                    disabled={page === 1 || loading}
                    className="h-8 w-8 p-0"
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="flex items-center gap-1">
                    {renderPageNumbers()}
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={handleNextPage}
                    disabled={page === totalPages || loading}
                    className="h-8 w-8 p-0"
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
};

export default PaginationControls;
