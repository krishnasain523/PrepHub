const express=require("express");
const router=express.Router();
const companys=require("../models/companyschema");
const pyqs=require("../models/pyqschema");
router.post("/company",async(req,res)=>{
    try{
        const{name}=req.body;
        const newcompany=await companys.create({name});
        res.status(202).json({massege:"company listed"},newcompany);
    }
    catch(err)
    {
         console.log(err);
    }
})
router.post("/pyq",async(req,res)=>{
    try
    {
        const {name,year,file_url,comp_id}=req.body;
        const newpyq=await pyqs.create({name,year,file_url,comp_id})
         res.status(202).json({massege:"pyq uploaded"},newpyq);
    }
    catch(err)
    {
        console.log(err);
    }
})
router.get("/company/:comp_id/pyq",async(req,res)=>{
    try
    {   const{comp_id}=req.params;
       const pyq=await pyqs.find({comp_id:comp_id});
       if(!pyq)
       {
        res.json({massege:"company not listed"})
       }
       res.json(pyq);
    }
    catch(err)
    {
        console.log(err);
    }
})
module.exports=router