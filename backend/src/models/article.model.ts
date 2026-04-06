//article model

import mongoose, { Schema, Document, Types } from 'mongoose'
import { ArcticleType, ArticleCategory, ArticleDifficulty, ArticleStatus } from '../common/enums/article.enums.js'

export interface IArticle extends Document {
   title: string
   slug: string
   content: string
   difficulty: ArticleDifficulty
   tags: string[]
   category: ArticleCategory
   subcategory?: string
   type: ArcticleType
   status: ArticleStatus
   author: Types.ObjectId
   views: number
}

const ArticleSchema = new Schema<IArticle>({
   title: { type: String, required: true },
   slug: { type: String, required: true, unique: true },
   content: { type: String, required: true },
   difficulty: { type: String, enum: Object.values(ArticleDifficulty), required: true },
   tags: [{ type: String }],
   category: { type: String, enum: Object.values(ArticleCategory), required: true },
   subcategory: { type: String },
   type: { type: String, enum: Object.values(ArcticleType), required: true },
   status: { type: String, enum: Object.values(ArticleStatus), default: ArticleStatus.DRAFT },
   author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
   views: { type: Number, default: 0 }
},
   { timestamps: true }
)

//indexes
ArticleSchema.index({ slug: 1 })
ArticleSchema.index({ status: 1 })
ArticleSchema.index({ author: 1 })
ArticleSchema.index({ category: 1 })
ArticleSchema.index({ difficulty: 1 })
ArticleSchema.index({ type: 1 })

ArticleSchema.set("toJSON", {
   transform: (_doc, ret: any) => {
      ret.id = ret._id.toString();
      delete ret._id;
      delete ret.__v;
   }
})

export const ArticleModel = mongoose.model<IArticle>("Article", ArticleSchema)