//conflict error

import { HttpError } from "./http.errors"

export class ConflictError extends HttpError {
   constructor(message = 'Conflict') {
      super(409, message)
   }
}