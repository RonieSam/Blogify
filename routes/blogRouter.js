const express=require("express")
const multer  = require('multer')
const path=require("path")
const fs=require("fs")

const blogRouter=express()
const {getUser}=require("../controllers/webToken")
const blogModel = require("../models/blog")
const commentModel=require("../models/comments")


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const userPath=path.resolve(`./public/uploads/${req.user.id}`)
    fs.mkdir(userPath,(err)=>{})
    cb(null,userPath )
  },
  filename: function (req, file, cb) {
    const fileName = Date.now() + '-' + Math.round(Math.random() * 1E9)+file.originalname
    req.fileName=fileName
    cb(null,fileName)
  }
})

const upload = multer({ storage: storage })

blogRouter


.get("/add",(req,res)=>{
  const user =getUser(req.cookies.uuid)
  return res.render("add-blog",{
    user:user
  })
})


.post("/",upload.single("cover-image"),async(req,res)=>{
  const body=req.body
   await blogModel.create({
    title:body.title,
    body:body.body,
    coverImageURL:`/public/uploads/${req.user._id}/${req.fileName}`,
    createdBy:req.user._id
  })  
  return res.redirect("/")
})

.get("/:id",async(req,res)=>{
  const id=req.params.id
  const blog=await blogModel.findById(id).populate("createdBy")
  const comments=await commentModel.find({blogId:id}).populate("userId")
  console.log(comments)

  return res.render("blog",{
      blog:blog,
      user:req.user,
      blogUser:blog.createdBy,
      comments:comments
  })
})

.post("/comment/:blogId",async(req,res)=>{
  const body=req.body
  const blogId=req.params.blogId

  const blog=await blogModel.findById(blogId)
  console.log(req.user)
  const comment=await commentModel.create({
    commentBody:body.commentBody,
    blogId:blogId,
    userId:req.user._id
  })
  console.log(comment)
  return res.redirect(`/blog/${blogId}`)
})
 
module.exports=blogRouter