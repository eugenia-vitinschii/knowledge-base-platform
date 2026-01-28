//article model

import mongoose, { Schema, Document, Types } from 'mongoose'
import { ArcticleType, ArticleCategory, ArticleDifficulty, ArticleStatus } from '../common/enums/article.enums'

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

}

const ArticleSchema = new Schema<IArticle>({
   title: { type: String, required: true },
   slug: { type: String, required: true, unique: true },
   content: { type: String, required: true },
   difficulty: { type: String, enum: Object.values(ArticleDifficulty), requred: true },
   tags: [{ type: String }],
   category: { type: String, enum: Object.values(ArticleCategory), required: true },
   subcategory: { type: String },
   type: { type: String, enum: Object.values(ArcticleType), required: true },
   status: { type: String, enum: Object.values(ArticleStatus), default: ArticleStatus.DRAFT },
   author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
},
   { timestamps: true }
)

export const ArticleModel = mongoose.model<IArticle>("Article", ArticleSchema)