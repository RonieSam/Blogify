const mongoose=require("mongoose")

const commentSchema=new mongoose.Schema({
  commentBody:{
    type:String,
    required:true
  },
  blogId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"blog"
  },
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user"
  }
},{timestamps:true})

const commentModel=mongoose.model("comment",commentSchema)
module.exports=commentModel