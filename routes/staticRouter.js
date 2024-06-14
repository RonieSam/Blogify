const express=require("express")
const blogModel=require("../models/blog")
const staticRouter=express()

staticRouter
.get("/",async(req,res)=>{
  const blogs=await blogModel.find({})
  return res.render("home",{
    user:req.user,
    blogs:blogs
  }
  )
})
module.exports=staticRouter