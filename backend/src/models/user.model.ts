//user model

import mongoose, { Schema, Document } from "mongoose";
import { Role } from "../common/enums/role.enum";

export interface IUser extends Document {
   name: string
   email: string
   password: string
   role: Role
}

const UserSchema: Schema = new Schema<IUser>({
   name: { type: String, required: true, unique: true },
   email: { type: String, required: true, unique: true },
   password: { type: String, required: true },
   role: {
      type: String,
      enum: Object.values(Role),
      default: Role.VIEWER,
   },
}, { timestamps: true })



export const UserModel = mongoose.model<IUser>("User", UserSchema)