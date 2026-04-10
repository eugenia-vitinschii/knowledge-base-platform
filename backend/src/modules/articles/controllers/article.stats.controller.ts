//article stats (admin)

import { NextFunction, Request, Response } from "express"

/* SERVICE */
import { articleStatsService } from "../services/article.stats.service.js"

class ArticleStatsController {
   /* GET ALL STATS (status, difficulty, category, type, author) */
   getOverviewStats = async (req: Request, res: Response, next: NextFunction) => {
      try {
         const articlesByStatus = await articleStatsService.getOverviewStats(req.user!)

         res.json(articlesByStatus)
      } catch (error) {
         next(error)
      }
   }
   getStatsSummary = async (req: Request, res: Response, next: NextFunction) => {
      try {
         const articleSummary = await articleStatsService.getSummaryService()

         res.json(articleSummary)

      } catch (error) {
         next(error)
      }
   }
}
export const articleStatsController = new ArticleStatsController()
