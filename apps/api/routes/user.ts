import express from 'express';
import { prismaClient } from 'store/client';
import jwt from 'jsonwebtoken';
import { AuthInput } from '../types.ts';

const router = express.Router();
 
// Signup Route
router.post("/signup", async (req, res) => {
    const data = AuthInput.safeParse(req.body);
    if (!data.success) {
        res.status(403).json({
            message: "Wrong Input"
        })
    }
    try {
        const user = await prismaClient.user.create({
            data: {
                email: data.data?.email!,
                password: data.data?.password!
            }
        })
        let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!);

        res.status(200).json({
            token: token,
            message: "User Created Successfully"
        })
    } catch (e) {
        res.status(403).json({
            message: "Database error. Try again!!!",
            Error: e
        })
    }
});

// Signin Route
router.post("/signin", async (req, res) => {
    const data = AuthInput.safeParse(req.body);
    if (!data.success) {
        res.status(403).json({
            message: "Wrong Input"
        })
    }
    try {
        const user = (await prismaClient.user.findMany({
            where: {
                email: data.data?.email,
            },
        }))[0]

        if (user?.password !== data.data?.password) {
            res.status(403).json({
                message: "Incorrect Password"
            })
        }
        let token = jwt.sign({ id: user?.id }, process.env.JWT_SECRET!);

        res.status(200).json({
            token: token,
            message: "User Loggedin"
        })
    } catch (e) {
        res.status(403).json({
            message: "Database error. Try again!!!",
            Error: e
        })
    }
});

export default router;