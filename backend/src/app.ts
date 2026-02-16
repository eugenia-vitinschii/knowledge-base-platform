import express from 'express'
import cors from 'cors'

import userRoutes from "./routes/user.routes"
import authRoutes from "./routes/auth.routes"
import articleRoutes from './routes/article.routes'
import { errorMiddleware } from './middleware/error.middleware'
export const app = express()


app.use(cors())
app.use(express.json())

app.get('/', (_req, res) => {
   res.json({ status: 'ok' })
})

app.use('/api/users', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/articles', articleRoutes)

app.use(errorMiddleware)
