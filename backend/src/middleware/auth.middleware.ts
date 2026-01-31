//auth middleware

import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../common/utils/jwt";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
   const authHeader = req.headers.authorization

   if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: "No Token!" })
   }
   const token = authHeader.split(' ')[1]

   try {
      const payload = verifyToken(token)
      req.user = payload
      next()
   } catch {
      return res.status(401).json({ messsge: "invalid token!" })
   }

}