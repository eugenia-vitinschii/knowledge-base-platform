
export interface PagintionMeta {
   total: number
   page: number
   pages: number
}


export interface PaginatedResponse<T> {
   data: T[]
   meta: PagintionMeta
}