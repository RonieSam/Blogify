const mongoose=require("mongoose")

function connectToDataBase(URL){
  mongoose.connect(URL)
  .then(()=>console.log("Connected to DataBase"))
  .catch((err)=>console.log(err))
}
module.exports={connectToDataBase}