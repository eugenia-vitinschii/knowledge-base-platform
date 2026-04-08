//paginated response


export interface PaginatedResponse<T> {
   data: T[]
   meta: {
      total: number
      page: number
      pages: number
   }
}