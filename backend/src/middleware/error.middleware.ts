// error middleware

import { Request, Response, NextFunction } from "express"
import { HttpError } from "../common/errors"

export const errorMiddleware = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
   if (err instanceof HttpError) {
      return res.status(err.status).json({ message: err.message })
   }

   console.error(err)

   return res.status(500).json({ message: 'Internal server error' })
}