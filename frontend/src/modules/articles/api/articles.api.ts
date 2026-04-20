//articles api
import { articlesCrudApi } from "./articles.crud.api"
import { articlesAdminApi } from "./articles.admin.api"
import { articlesPublicApi } from "./articles.public.api"

export const articlesApi = {
   crud: articlesCrudApi,
   admin: articlesAdminApi,
   public: articlesPublicApi,
}