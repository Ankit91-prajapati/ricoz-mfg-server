import mongoose from "mongoose";

 export default async function connectDB() {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/ricoz`)
        console.log("DB connect successfully")
    } catch (error) {
        console.error(error)
    }
    
}