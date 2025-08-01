import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import userRouter from "./routers/userRouter.js";
import cors from "cors";
dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(
    (req,res,next)=>{
        const value = req.header("Authorization")
        if(value != null){
            const token = value.replace("Bearer ","")
            jwt.verify(token,process.env.JWT_TOKEN_KEY,(err,decoded)=>{
                if(decoded == null){
                    res.status(403).json({
                        message : "Unauthorized"
                    })
                }else{
                    req.user = decoded
                    next()
                }
            })
        }else{
            next()
        }
    }
)

const connectionString = process.env.MONGO_URI;
mongoose.connect(connectionString).then(()=>{
    console.log("Connected to the Database");
}).catch(()=>{
    console.log("Failed to connect to the Database");
})

app.use("/users", userRouter);

//Start server
const PORT = 5000;
app.listen(PORT,()=>{
    console.log(`Server started on http://localhost:${PORT}`);
})