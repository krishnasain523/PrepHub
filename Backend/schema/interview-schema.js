const mongoose=require("mongoose");
module.exports=new mongoose.Schema({
   question:{
    type:String,
    required:true,
    unique:true
   },
   answer:{
    type:String,
    required:true,
},
  category:{
    type:String,
  },
  subcategory:{
     type:String,
  },
 difficulty:{
     type:String,
     default:"easy"
 },
 option:{
      type:[String],
      default:[]
 }
},{timestamps:true});
