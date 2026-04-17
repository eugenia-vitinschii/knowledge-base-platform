//user model

import mongoose, { Schema, Document } from "mongoose";
import { Role } from "../../../common/enums/role.enum.js";
import { Position, Location, Gender } from "../../../common/enums/user.enums.js";

export interface IUser extends Document {
   name: string
   email: string
   password: string
   role: Role

   position: Position
   location: Location
   phone: string

   gender: Gender
   bio: string

   birthdate: Date
   hiredDate: Date

}

const UserSchema: Schema = new Schema<IUser>({
   name: { type: String, required: true },
   email: { type: String, required: true, unique: true },
   password: { type: String, required: true },
   role: {
      type: String,
      enum: Object.values(Role),
      default: Role.VIEWER,
   },
   position: { type: String, enum: Object.values(Position), default: Position.OTHER },
   location: { type: String, enum: Object.values(Location), default: Location.REMOTE },
   phone: { type: String },

   gender: { type: String, enum: Object.values(Gender), default: Gender.OTHER },
   bio: { type: String, maxlength: 500 },

   birthdate: { type: Date },
   hiredDate: { type: Date },

}, { timestamps: true })

UserSchema.set("toJSON", {
   transform: (_doc, ret: any) => {
      ret.id = ret._id.toString();
      delete ret._id;
      delete ret.__v;
   }
})

export const UserModel = mongoose.model<IUser>("User", UserSchema)