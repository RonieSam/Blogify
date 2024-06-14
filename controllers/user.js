const userModel=require("../models/user")
const crypto=require("crypto")
const {getToken,getUser}=require("./webToken")


async function handleSignIn(req,res){
  const {email,password}=req.body
  if(!email||!password){return res.render("signin",{
    err:"All fields are required"
  })}
  const user=await userModel.findOne({email:email})
  if(!user){return res.render("signin",{
      err:"User not found"
    })}
    const hashedPassword=crypto.createHmac('sha256', user.salt).update(password).digest("hex")
  if(user.password!=hashedPassword){ 
    return res.render("signin",{
      err:"Password is incorrect"
      
    })}

    res.cookie("uuid",getToken(user))
  res.redirect("/")
}
async function handleSignUp(req,res){
    const {name,email,password}=req.body
    
  if(!name||!email||!password) 
    {
      return res.render("signup",{
    err:"All fields have to be filled"
  })}
  if(await userModel.findOne({email:email})){
    return res.render("signup",{
  err:"Email already registered"
})}
  const user={
      name:name,
      email:email,
      password:password
     }
    await userModel.create(user)
    res.cookie("uuid",getToken(user))
    return res.redirect("/")
  }
 module.exports={handleSignUp,handleSignIn}