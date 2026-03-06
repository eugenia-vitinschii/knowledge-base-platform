//articles api
import { articlesCrudApi } from "./articles/articles.crud.api"
import { articlesAdminApi } from "./articles/articles.admin.api"
import { articlesPublicApi } from "./articles/articles.public.api"

export const articlesApi = {
   crud: articlesCrudApi,
   admin: articlesAdminApi,
   public: articlesPublicApi
}