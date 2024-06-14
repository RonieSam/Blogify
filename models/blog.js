const mongoose=require("mongoose")
const path=require("path")
const blogSchema=new mongoose.Schema({
  title:{
    type:String,
    required:true
  },
  body:{
    type:String,
    required:true
  },
  coverImageURL:{
    type:String,
    default:"./public/uploads/default.jpeg"
  },
  createdBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user"
  },
  
},{timestamps:true})

const blogModel=mongoose.model("blog",blogSchema)

module.exports=blogModel