//bag request error

import { HttpError } from "./http.errors"

export class BadRequestError extends HttpError {
   constructor(message = 'Bad request') {
      super(400, message)
   }
}