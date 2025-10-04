import express from 'express';
import { prismaClient } from 'store/client';
import jwt from 'jsonwebtoken';
import { AuthInput } from '../types.ts';

const router = express.Router();
 
// Signup Route
router.post("/signup", async (req, res) => {
    const data = AuthInput.safeParse(req.body);
    if (!data.success) {
        return res.status(403).json({
            message: "Wrong Input",
            errors: data.error.errors
        });
    }
    try {
        // Check if user already exists
        const existingUser = await prismaClient.user.findFirst({
            where: { email: data.data.email }
        });
        
        if (existingUser) {
            return res.status(409).json({
                message: "User already exists"
            });
        }

        const user = await prismaClient.user.create({
            data: {
                email: data.data.email,
                password: data.data.password
            }
        })
        let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!);

        return res.status(200).json({
            token: token,
            message: "User Created Successfully"
        });
    } catch (e) {
        console.error('Signup error:', e);
        return res.status(500).json({
            message: "Database error. Try again!!!",
            Error: process.env.NODE_ENV === 'development' ? e : undefined
        });
    }
});

// Signin Route
router.post("/signin", async (req, res) => {
    const data = AuthInput.safeParse(req.body);
    if (!data.success) {
        return res.status(403).json({
            message: "Wrong Input",
            errors: data.error.errors
        });
    }
    try {
        const user = await prismaClient.user.findFirst({
            where: {
                email: data.data.email,
            },
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        if (user.password !== data.data.password) {
            return res.status(403).json({
                message: "Incorrect Password"
            });
        }
        
        let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!);

        return res.status(200).json({
            token: token,
            message: "User Loggedin"
        });
    } catch (e) {
        console.error('Signin error:', e);
        return res.status(500).json({
            message: "Database error. Try again!!!",
            Error: process.env.NODE_ENV === 'development' ? e : undefined
        });
    }
});

export default router;