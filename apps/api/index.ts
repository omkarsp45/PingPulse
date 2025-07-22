import express from 'express'
import jwt from 'jsonwebtoken'
import { prismaClient } from "store/client"
import { AuthInput } from './types';

const app = express()
app.use(express.json());

app.post("/website", (req, res) => {
    res.json({ msg: "req" });
})

app.get("/status/:websiteId", (req, res) => {

})

app.post("/user/signup", async (req, res) => {
    const data = AuthInput.safeParse(req.body.data);
    if (!data.success) {
        res.status(403).json({
            message: "Wrong Input"
        })
    }
    try {
        const user = await prismaClient.user.create({
            data: {
                email: data.data?.email,
                password: data.data?.password
            }
        })
        res.status(200).json({
            id: user.id,
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
    const data = AuthInput.safeParse(req.body.data);
    if (!data.success) {
        res.status(403).json({
            message: "Wrong Input"
        })
    }
    try {
        const user = await prismaClient.user.findUnique({
            where: {
                email: data.data?.email,
            },
        })
        if (user.password !== data.data?.password) {
            res.status(403).json({
                message: "Incorrect Password"
            })
        }
        res.status(200).json({
            id: user.id,
            message: "User Loggedin"
        })
    } catch (e) {
        res.status(403).json({
            message: "Database error. Try again!!!",
            Error: e
        })
    }
})

app.listen(process.env.PORT || 3000, () => {
    console.log("Started backend on port 3000");
})