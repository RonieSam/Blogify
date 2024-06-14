const jsonWebToken=require("jsonwebtoken")
const userModel=require("../models/user")
const {getUser}=require("../controllers/webToken")

async function checkSignedIn(req,res,next){
  const uuid=req.cookies.uuid
  const tokenIdentity=getUser(uuid)
  if(!uuid || !tokenIdentity) {req.user=null
    return next()}
  const user=await userModel.findOne({name:tokenIdentity.name,email:tokenIdentity.email})
  if(!user) req.user=null
  else req.user=user
  console.log("called")
  return next()
}
module.exports={checkSignedIn,}