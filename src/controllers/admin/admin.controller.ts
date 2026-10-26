import { Request, Response } from "express";
import User from "../../models/user.model.js";


 export default async function showUsersData(req:Request , res:Response) {
   try {
    const users = await User.find()
     const safeUsers = users.map((user) => ({
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      isemailVerified: user.isemailVerified,
      createdAt: user.createdAt,
    }));
    return res.status(200).json({success:true , message:"Data successfully fetched" , users:safeUsers})
   } catch (error) {
     return res.status(500).json({success:false , error:"users not found",   message: "Users not found"})
   }
    
    
}