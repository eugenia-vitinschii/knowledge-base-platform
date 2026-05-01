// users + profile fields (admin/public)

import { z } from 'zod'

export const nameField = z
   .string({ error: "Name is required" })
   .trim().min(5, "Minimum 5 characters")
   .max(50, 'Maximum 50 characters')

export const emailField = z
   .string({ error: "Email is required" })
   .trim()
   .email("Invalid email adress")

export const phoneField = z
   .string()
   .trim()
   .max(30, 'Too long ')
   .optional()

export const bioField = z
   .string().max(500, 'Maximum 500 characters').optional()

export const passwordField = z
   .string().min(4, "Minimum 5 characters").max(34, "Maximum 34 characters")


