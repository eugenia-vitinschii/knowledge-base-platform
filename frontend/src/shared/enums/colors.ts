//color palletare for badges

import { ArcticleType, ArticleCategory, ArticleDifficulty } from "./article.enum"

/* DIFFICULTY */
export const difficultyColors: Record<ArticleDifficulty, string> = {
   [ArticleDifficulty.BEGINNER]: '#a3e635',
   [ArticleDifficulty.INTERMEDIATE]: '#facc15',
   [ArticleDifficulty.ADVANCED]: '#f87171',
}

/* TYPES */
export const typeColors: Record<ArcticleType, string> = {
   [ArcticleType.ARTICLE]: '#60a5fa',
   [ArcticleType.DOCUMENTATION]: '#34d399',
   [ArcticleType.GUIDE]: '#f97316',
   [ArcticleType.REFERENCE]: '#facc15',
}

/* CATEGORY  */
export const categoryColors: Record<ArticleCategory, string> = {
   [ArticleCategory.BACKEND_BASIS]: '#38bdf8',
   [ArticleCategory.FORMS_VALIDATIONS]: '#f97316',
   [ArticleCategory.HTML_CSS]: '#ff6b6b',
   [ArticleCategory.JAVASCRIPT]: '#facc15',
   [ArticleCategory.PINIA]: '#a78bfa',
   [ArticleCategory.TYPESCRIPT]: '#60a5fa',
   [ArticleCategory.VUE]: '#1e8962',
   [ArticleCategory.ZOD]: '#fb7185'
}
