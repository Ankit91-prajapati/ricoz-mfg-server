import { Router } from "express";
import showUsersData from "../controllers/admin/admin.controller.js";
import userAuth from "../middleware/userAuth.js";
import userRole from "../middleware/userRole.js";

const adminRouter  = Router()

adminRouter.get("/data", userAuth ,userRole("admin"),showUsersData )
export default adminRouter