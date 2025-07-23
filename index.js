import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const app = express();

const connectionString = process.env.MONGO_URI;
mongoose.connect(connectionString).then(()=>{
    console.log("Connected to the Database");
}).catch(()=>{
    console.log("Failed to connect to the Database");
})

//Start server
const PORT = 5000;
app.listen(PORT,()=>{
    console.log(`Server started on http://localhost:${PORT}`);
})