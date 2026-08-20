//connect mongo

import mongoose from "mongoose";

export const connectDB = async () => {
   try {
      const conn = await mongoose.connect(process.env.MONGO_URI as string)
      console.log(`🤟 MongoDB Connected: ${conn.connection.host}`);
      console.log(`Database Name: 🌱 ${conn.connection.name}`);
   } catch (error) {
      console.error("⛔️⛔️⛔️ MongoDB connection failed ⛔️⛔️⛔️", error)
      process.exit(1)
   }
}
