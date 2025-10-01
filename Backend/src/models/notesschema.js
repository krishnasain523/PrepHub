const mongoose=require("mongoose");
module.exports=new mongoose.Schema({
title:{
    type:String,
    required:true
},
category:{
     type:String,
},
fileurl:{
     type:String,
}

});
