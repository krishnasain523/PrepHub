const mongoose=require("mongoose");
const chatschema=mongoose.Schema({
    question:{type:String,
        required:true,
    },
    answer:{type:String,required:true}
});

module.exports=mongoose.model("Chat",chatschema);
