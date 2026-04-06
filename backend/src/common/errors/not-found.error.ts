//not found error

import { HttpError } from "./http.errors.js"

export class NotFoundError extends HttpError {
   constructor(message = 'Noy found') {
      super(404, message)
   }
}