const autherizedrole=(...allowedrole)=>
{
    return  (req,res,next)=>{
            if(!allowedrole.includes(req.user.role))
            {
                res.status(404).json({massege:"accesss denied"});
            }
            next();
        }
    
}
module.exports=autherizedrole;