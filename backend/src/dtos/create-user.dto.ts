//create user dto

import { Role } from '../common/enums/role.enum'

export interface CreateUserDto {
   name: string
   email: string
   password: string
   role: Role
}
