//forbidden error

import { HttpError } from "./http.errors.js"

export class ForbiddenError extends HttpError {
   constructor(message = 'Forbidden') {
      super(403, message)
   }
}