/* CREATE COMMENTS DTO */

import { z } from "zod"

export const CreateCommentDto = z.object({
   content: z.string().trim().min(1).max(1000),
})