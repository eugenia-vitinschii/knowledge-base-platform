// error middleware

import { Request, Response, NextFunction } from "express"
import { HttpError } from "../common/errors"
import mongoose from "mongoose"

export const errorMiddleware = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
   //Mongoose CastError
   if (err instanceof mongoose.Error.CastError) {
      return res.status(400).json({
         message: "Invalid id format"
      })
   }
   //custom err
   if (err instanceof HttpError) {
      return res.status(err.status).json({ message: err.message })
   }

   console.error(err)

   return res.status(500).json({ message: 'Internal server error' })
}