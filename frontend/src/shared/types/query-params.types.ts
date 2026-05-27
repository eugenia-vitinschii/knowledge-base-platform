//pagination params

export interface PaginationParams {
   page?: number
   limit?: number
   total?: number
}

export type QueryParams<T> = T & PaginationParams