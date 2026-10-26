import { NextFunction, Request, Response } from "express";

function requireRole(role: "user" | "admin") {
  return (req: Request, res: Response, next: NextFunction) => {
    const authUser = req.user;

    if (!authUser) {
      return res.status(401).json({ message: "You are not authenticated" });
    }

    if (authUser.role !== role) {
      return res
        .status(403)
        .json({ message: "You dont have correct role to access this route" });
    }

    next();
  };
}

export default requireRole;
