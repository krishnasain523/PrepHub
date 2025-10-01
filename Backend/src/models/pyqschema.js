const mongoose=require("mongoose");
const pyqschema=mongoose.Schema({
name:{type:String,unique:true},
year:{type:Number},
file_url:{type:String,unique:true},
comp_id:{type:mongoose.Schema.Types.ObjectId,ref:"Company",requierd:true}
})
module.exports=mongoose.model("Pyq",pyqschema);