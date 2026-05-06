//update article mapper

import type { UpdateArticlePayload } from "../types"

import type { ArticleFormData } from "../validation/articles.schema"

import { parseTags } from "./parse-tags"


export function mapFormToUpdatePayload(form: ArticleFormData): UpdateArticlePayload {
   return {
      title: form.title,
      content: form.content,
      subcategory: form.subcategory || undefined,
      difficulty: form.difficulty,
      category: form.category,
      type: form.type,
      tags: form.tags ? parseTags(form.tags as any) : []
   }
}