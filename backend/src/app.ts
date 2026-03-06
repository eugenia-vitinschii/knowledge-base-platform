//app 

import express from 'express'
import cors from 'cors'

import routes from "./routes/index"

import { errorMiddleware } from './middleware/error.middleware'

export const app = express()


app.use(cors())
app.use(express.json())

app.get('/', (_req, res) => {
   res.json({ status: 'ok' })
})


app.use('/api', routes)

app.use(errorMiddleware)
