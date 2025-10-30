const express=require("express");
const router=express.Router();
const {register,login}=require("../cantrolars/authcontroler");
const asynchandler = require("../midleware/asynchandler");
router.post("/register", asynchandler( register))
router.post("/login", asynchandler(login))

module.exports=router;