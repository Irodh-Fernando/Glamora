import express from "express";

const app = express();

//Start server
const PORT = 5000;
app.listen(PORT,()=>{
    console.log(`Server started on http://localhost:${PORT}`);
})