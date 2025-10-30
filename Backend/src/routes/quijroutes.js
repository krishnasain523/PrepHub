const express=require("express");
const router=express.Router();
const subjects =require("../models/subjectschema")
const topics =require("../models/topicschema")
const mcqs =require("../models/mcqschema");
const expresserr = require("../../utils/expresserr");
const asynchandler=require("../midleware/asynchandler")
router.post("/subject",asynchandler(async(req,res)=>
{
         const{name}=req.body;      
          const newsubject=await subjects.create({name});
        res.status(201).json(newsubject,{massege:"subject created"});
        
}));
router.post("/topic",asynchandler(async(req,res)=>
{                 const{name,sub_id}=req.body;
        const newtopic=await topics.create({name,sub_id});
        res.status(201).json(newtopic,{massege:"topic created"});
        
}))
router.post("/mcq",asynchandler(async(req,res)=>
{
         const{question,answer,options,topic_id}=req.body;
        const newmcqs=await mcqs.create({question,answer,options,topic_id});
        res.status(201).json(newmcqs,{massege:"mcqs created"});
       
}))
router.get("/subject",asynchandler(async(req,res)=>
{        
         const subject=await subjects.find();
        if(subject.length===0)
        {
              throw new expresserr(404,"subjects not initailized");
        }
        res.json(subject);
       
}))

router.get("/subject/:subjectid/topic",asynchandler(async(req,res)=>
{               const{subjectid}=req.params;
        const topicdata=await topics.find({sub_id:subjectid});
        if(!topicdata)
        {
               throw new expresserr(404,"topic not initailized");
        }
        res.json(topicdata);
        
}))

router.get("/topic/:topicid/mcq",asynchandler(async(req,res)=>
{               const{topicid}=req.params;
        const mcqdata=await mcqs.find({ topic_id:topicid});
        if(!mcqdata)
        {
               throw new expresserr(404,"mcq is not defind");
        }
        res.json(mcqdata);
}));

module.exports=router;