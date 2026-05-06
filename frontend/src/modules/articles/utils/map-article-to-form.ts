//article mapper 

import type { Article } from "../types"

import type { ArticleFormData } from "../validation/articles.schema"


export function mapArticleToForm(article: Article): ArticleFormData {
   return {
      title: article.title,
      content: article.content,
      subcategory: article.subcategory || '',
      difficulty: article.difficulty,
      category: article.category,
      type: article.type,
      tags: article.tags?.join(', ') ?? '',
      status: article.status,
   }
}
