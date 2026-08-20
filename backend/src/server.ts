
import 'dotenv/config'
import { app } from './app.js'
import { connectDB } from './config/database.js'

const PORT = process.env.PORT || 4000

const start = async () => {
   await connectDB()

   app.listen(PORT, () => {
      console.log(`
   ┌──────────────────────────────────────────────────┐
   │  🍀🍀🍀 Server running on port ${PORT} 🍀🍀🍀       │
   │  UI Kit: npm i modular-ui-kit-vue@latest         │
   └──────────────────────────────────────────────────┘
   `)
   })
}
start()