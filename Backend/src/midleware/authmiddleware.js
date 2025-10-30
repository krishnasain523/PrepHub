const jwt=require("jsonwebtoken");

const verifyuser=(req,res,next)=>{
    let token;
         token=req.cookies.token;
         if(!token)
         {
            res.json({massege:" you must loged in first"});
         }
         try{
            const decode=jwt.verify(token,process.env.token_secret);
            req.user=decode;
            console.log("the decoded user is", req.user);
            next();
         }

         catch(err)
         {
            res.json({massege:"token is not valid"})
         }
     
}
module.exports=verifyuser;