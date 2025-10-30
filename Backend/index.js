require("dotenv").config();
const express=require("express");
const app=express();
const port=process.env.port||3000
const mongoose=require("mongoose");
const URL=process.env.MONGO_URL;
const session=require("express-session");
const users=require("./src/models/userschema");
const dbconnect=require("./src/config/dbconnect");
dbconnect();
const authroutes=require("./src/routes/authroutes")
const userroutes=require("./src/routes/userroutes")
const quizroutes=require("./src/routes/quijroutes");
const pyqroutes=require("./src/routes/pyqroutes");
const chatroutes=require("./src/routes/chatroutes")
const verifytoken=require("./src/midleware/authmiddleware");
const errorhandler = require("./src/midleware/errorhandler");
const askGemini=require("./src/config/gemini");
// JSON body parse karne ke liye

app.use(express.json());

// Agar form-data bhejna ho to ye bhi kaam aata hai
app.use(express.urlencoded({ extended: true }));
app.listen(port,()=>{
    console.log("the server is runing on port 3000");
})
app.get("/",(req,res)=>{
    res.send("helo krishna");
})
app.use(session({
    secret:"mysecret",
    saveUninitialized:true,
    resave:false,
}))

// routes 
app.use("/api/auth",authroutes);
app.use("/api",userroutes);
app.use("/api",quizroutes);
app.use("/api",pyqroutes);
app.use("/api", chatroutes);
app.use(errorhandler);