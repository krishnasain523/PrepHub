const mongoose=require("mongoose");
const subjectschema=mongoose.Schema({

name:{type:String,required:true},

})
module.exports=mongoose.model("Subject",subjectschema);