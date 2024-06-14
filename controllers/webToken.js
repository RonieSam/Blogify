const jsonWebToken=require("jsonwebtoken")

const sign="$RoNiE@13579"

function getToken(user){
  return jsonWebToken.sign({
    id:user.id,
    name:user.name,
    email:user.email
  },sign)
}

function getUser(token){
  if(!token) return null
  return jsonWebToken.verify(token,sign)
}
module.exports={getToken,getUser}