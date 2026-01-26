import express from 'express'
import cors from 'cors'

import userRoutes from "./routes/user.routes"
import authRoutes from "./routes/auth.routes"
export const app = express()


app.use(cors())
app.use(express.json())

app.use('/api/users', userRoutes)
app.use('/api/auth', authRoutes)

app.get('/', (_req, res) => {
   res.json({ status: 'ok' })
})
