import 'dotenv/config'
import { app } from './app'
import { connectDB } from './config/database'

const PORT = process.env.PORT || 4000

const start = async () => {
   await connectDB()

   app.listen(PORT, () => {
      console.log(`Backends running on http://localhost:${PORT}`)
   })
}
start()