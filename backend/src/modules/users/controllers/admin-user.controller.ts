//admin user controller

import { NextFunction, Request, Response } from "express"

import { adminUserService } from "../services/admin-user.service.js"

class AdminUserController {
   /* CREATE USER */
   createUser = async (req: Request, res: Response, next: NextFunction) => {
      try {
         const user = await adminUserService.createUser(req.body)
         res.status(201).json(user)
      } catch (error) {
         next(error)
      }
   }
   /* GET ALL USERS*/
   getUsers = async (req: Request, res: Response, next: NextFunction) => {
      try {
         const users = await adminUserService.getAllUsers()
         res.json(users)
      } catch (error) {
         next(error)
      }
   }
   /* GET USER BY ID */
   getUserById = async (req: Request, res: Response, next: NextFunction) => {
      try {
         const id = req.params.id as string
         const user = await adminUserService.getUserById(id)
         res.json(user)
      } catch (error) {
         next(error)
      }
   }
   /* UPDATE ROLE */
   updateRole = async (req: Request, res: Response, next: NextFunction) => {
      try {
         const { role } = req.body
         const id = req.params.id as string

         const user = await adminUserService.updateUserRole(id, role)
         res.json(user)
      } catch (error) {
         next(error)
      }
   }

   /* UPDATE USER */
   updateUser = async (req: Request, res: Response, next: NextFunction) => {
      try {
         const id = req.params.id as string

         const user = await adminUserService.updateUser(id, req.body)
         res.json(user)
      } catch (error) {
         next(error)
      }
   }

   /* DETELE USER*/
   deleteUser = async (req: Request, res: Response, next: NextFunction) => {
      try {
         const id = req.params.id as string
         await adminUserService.deleteUser(id)
         res.json({ success: true })

      } catch (error) {
         next(error)
      }
   }
}

export const adminUserController = new AdminUserController()