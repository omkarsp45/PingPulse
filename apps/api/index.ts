import express from 'express'
import cors from 'cors'
import websiteRouter from './routes/website.ts';
import userRouter from './routes/user.ts';

const app = express()
app.use(express.json());
app.use(cors());

// Routes
app.use("/website", websiteRouter);
app.use("/user", userRouter);

app.listen(3001, () => {
    console.log("Started backend on port 3001");
})