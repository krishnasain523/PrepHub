const express=require("express");
const router=express.Router();
const companys=require("../models/companyschema");
const pyqs=require("../models/pyqschema");
const expresserr = require("../../utils/expresserr");
const asynchandler=require("../midleware/asynchandler")
router.post("/company",asynchandler(async(req,res)=>{
        const{name}=req.body;
        const newcompany=await companys.create({name});
        res.status(202).json({massege:"company listed"},newcompany);
}))
router.post("/pyq",asynchandler(async(req,res)=>{
        const {name,year,file_url,comp_id}=req.body;
        const newpyq=await pyqs.create({name,year,file_url,comp_id})
         res.status(202).json({massege:"pyq uploaded"},newpyq);

}))

router.get("/company",asynchandler(async(req,res)=>{
    const company=await companys.find();
    if(company.length===0 )
    {
         throw new expresserr(404," company not initilaized")
    }
    res.json(company);
}))
router.get("/company/:comp_id/pyq",asynchandler(async(req,res)=>{
       const{comp_id}=req.params;
       const pyq=await pyqs.find({comp_id:comp_id});
       if(!pyq)
       {
        throw new expresserr(404," pyq not uploaded");
       }
       res.json(pyq);
    
}))
module.exports=router