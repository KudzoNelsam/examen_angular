export interface RequestResponse {
    status : number
    results : any
    type : string
    pages? : number[]
    totalElements? : number
    totalPages? : number
    size? : number
    currentPage? : number
    hasNextPage? : boolean
    hasPreviousPage? : boolean
}