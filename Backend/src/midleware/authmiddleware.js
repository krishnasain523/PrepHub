const jwt=require("jsonwebtoken");

const verifytoken=(req,res,next)=>{
    let token;
         const authheader = req.headers["authorization"];
     if(authheader&& authheader.startsWith("Bearer"))
     {
         token=authheader.split(" ")[1];
         if(!token)
         {
            res.json({massege:"no token autherization denied"});
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
}
module.exports=verifytoken;