require("dotenv").config();
const express=require("express");
const app=express();
const port=process.env.port||3000
const mongoose=require("mongoose");
const URL=process.env.MONGO_URL;
app.listen(port,()=>{
    console.log("the server is runing on port 3000");
})
app.get("/",(req,res)=>{
    res.send("helo krishna");
})
mongoose.connect(URL).then(()=>{
  console.log("db connected");
}).catch((err)=>{
    console.log(err);
})