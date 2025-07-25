import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const header = req.headers.authorization!;
    try {
        let user = jwt.verify(header, process.env.JWT_SECRET!);
        req.userId = user.id
        next()
    } catch (e) {
        res.status(403).json({
            message: "Something went wrong! Please signout and login again.",
            Error: e
        })
    }
}