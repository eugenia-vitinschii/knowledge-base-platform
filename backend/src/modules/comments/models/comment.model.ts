/* COMMENT MODEL */

import mongoose, { Schema, Document, Types } from 'mongoose'

export interface IComment extends Document {
   article: Types.ObjectId,
   author: Types.ObjectId,
   content: string,
   likes: number,
}


const CommentSchema = new Schema<IComment>({
   article: { type: Schema.Types.ObjectId, ref: 'Article', required: true },
   author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
   content: { type: String, required: true, trim: true },
   likes: { type: Number, default: 0 },

}, { timestamps: true }
)

//indexes
CommentSchema.index({ article: 1 })
CommentSchema.index({ author: 1 })

export const CommentModel = mongoose.model<IComment>('Comment', CommentSchema)