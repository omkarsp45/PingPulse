
import express from 'express'
import jwt from 'jsonwebtoken'
import { prismaClient } from "store/client"
import { AuthInput } from './types';
import { authMiddleware } from "./middleware.ts";
import { ensureUserExists } from './ensureUserExists.ts';
import cors from 'cors'

const app = express()
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.post("/website", authMiddleware, async (req, res) => {
    const { userId } = (req as any).auth;
    await ensureUserExists(userId);
    if (!req.body.url) {
        res.status(411).json({
            message: "URL not found"
        })
    }
    try {
        const website = await prismaClient.website.create({
            data: {
                url: req.body.url,
                timeAdded: new Date(),
                userId: userId
            }
        })
        res.status(200).json({
            message: "Website added successfully",
            id: website.id
        })
    } catch (e) {
        res.status(403).json({
            message: "Database error. Try again!!!",
            Error: e
        })
    }
})

app.get("/status/:websiteId", authMiddleware, async (req, res) => {
    const websiteId = req.params.websiteId;

    const website = await prismaClient.website.findMany({
        where: {
            id: websiteId,
            userId: req.userId
        },
        include: {
            ticks: {
                orderBy: [
                    {
                        createdAt: 'desc'
                    }
                ],
                take: 1
            }
        }
    })
})


app.get("/websites", authMiddleware, async (req, res) => {
    const { userId } = (req as any).auth;
    await ensureUserExists(userId);
    const websites = await prismaClient.website.findMany({
        where: {
            userId: userId
        }, include: {
            ticks: {
                orderBy: [
                    {
                        createdAt: 'desc'
                    }
                ],
                take: 1
            }
        }
    })
    res.status(200).json({
        websites: websites
    })
})

app.post("/user/signup", async (req, res) => {
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
})

app.post("/user/signin", async (req, res) => {
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
})

app.listen(3001, () => {
    console.log("Started backend on port 3001");
})