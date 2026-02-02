//validate resource

import { ZodObject } from "zod";
import { Request, Response, NextFunction } from "express";

export const validateResource = (schema: ZodObject<any>) => (req: Request, res: Response, next: NextFunction) => {
   const result = schema.safeParse(req.body);

   if (!result.success) {
      return res.status(400).json({
         message: 'Validation error',
         errors: result.error.flatten().fieldErrors,
      });
   }
   req.body = result.data;
   next();
}