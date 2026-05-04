// reusable articles fields 

import { z } from 'zod'


export const titleField = z
   .string({ error: "Name is required" })
   .trim().min(7, "Minimum 7 characters")
   .max(50, 'Maximum 50 characters')


export const contentField = z
   .string({ error: "Content is required" })
   .trim().min(20, "Minimum 20 characters")
