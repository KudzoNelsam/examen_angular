export interface Pagination {
    currentPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    pages: number[];
}