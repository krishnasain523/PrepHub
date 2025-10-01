const express=require("express");
const router=express.Router();
const subjects =require("../models/subjectschema")
const topics =require("../models/topicschema")
const mcqs =require("../models/mcqschema")
router.post("/subject",async(req,res)=>
{
       try
       {
         const{name}=req.body;
        const newsubject=await subjects.create({name});
        res.status(201).json(newsubject,{massege:"subject created"});
       }
       catch(err){
        console.log(err);
       }
        
})
router.post("/topic",async(req,res)=>
{
        try{
                  const{name,sub_id}=req.body;
        const newtopic=await topics.create({name,sub_id});
        res.status(201).json(newtopic,{massege:"topic created"});
        }
        catch(err)
        {
                console.log(err);
        }
        
})
router.post("/mcq",async(req,res)=>
{
       try
       {
         const{question,answer,options,topic_id}=req.body;
        const newmcqs=await mcqs.create({question,answer,options,topic_id});
        res.status(201).json(newmcqs,{massege:"mcqs created"});
       }
       catch(err)
       {
        console.log(err);
       }
})
router.get("/subject",async(req,res)=>
{        
       try{
         const subject=await subjects.find();
        if(!subject)
        {
                res.status(404).json({massege:"subject not availeble"});
        }
        res.json(subject);
       }
       catch(err)
       {
        console.log(err);
       }
})

router.get("/subject/:subjectid/topic",async(req,res)=>
{
        try{
                const{subjectid}=req.params;
        const topicdata=await topics.find({sub_id:subjectid});
        if(!topicdata)
        {
                res.json({massege:"the topics is not defined"})
                console.log("topic not find");
        }
        res.json(topicdata);
        }
        catch(err)
        {
                console.log(err);
        }
})

router.get("/topic/:topicid/mcq",async(req,res)=>
{
          try{
                const{topicid}=req.params;
        const mcqdata=await mcqs.find({ topic_id:topicid});
        if(!mcqdata)
        {
                res.json({massege:"the mcqs is not defined"})
        }
        res.json(mcqdata);
        }
        catch(err)
        {
                console.log(err);
        }
});

module.exports=router;