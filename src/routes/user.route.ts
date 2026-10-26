import { Request, Response, Router
 } from "express";
import userAuth from "../middleware/userAuth.js";
import UserModel from "../models/user.model.js";

   const userRouter = Router()

 userRouter.get("/me" , userAuth ,async(req:Request ,res:Response)=>{
  try {
    const me = await UserModel.findById(req.user!.id)
    return res.status(200).json({ success:true ,user:me})
    
  }catch (error) {
     return res.status(500).json({success:false , error:error})
   }

 })

 export default userRouter