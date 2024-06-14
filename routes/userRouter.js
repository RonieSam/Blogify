const express=require("express")

const {handleSignIn,handleSignUp}=require("../controllers/user")

userRouter=express()

userRouter
.get("/signup",(req,res)=>{
  
  return res.clearCookie("uuid").render("signup")
})
.get("/signin",(req,res)=>{
  return res.clearCookie("uuid").render("signin")
})

.post("/signup",handleSignUp)
.post("/signin",handleSignIn)

module.exports=userRouter