//bag request error

import { HttpError } from "./http.errors"

export class UnauthorizedError extends HttpError {
   constructor(message = 'Unauthorized') {
      super(401, message)
   }
}