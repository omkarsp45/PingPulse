import express from 'express'
import { prismaClient } from "store/client"
const app = express()

app.use(express.json());
app.post("/website", (req, res) => {
    res.json({msg: "req"});
})

app.get("/status/:websiteId", (req, res)=>{

})

app.listen(process.env.PORT || 3000, ()=>{
    console.log("Started backend on port 3000");
})