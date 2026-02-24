//types/article types
import type { ArticlePreview } from "./article-preview.type";

export interface Article extends ArticlePreview {
   author: string;
   createdAt: string;
}

