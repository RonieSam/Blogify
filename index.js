const express=require("express")
const path=require("path")

const userRouter=require("./routes/userRouter")
const staticRouter=require("./routes/staticRouter")
const blogRouter=require("./routes/blogRouter")

const {checkSignedIn}=require("./middlewares/index")

const {connectToDataBase}=require("./connection")
const cookieParser = require("cookie-parser")
connectToDataBase("mongodb://localhost:27017/blog")

const app=express()
const port=8000
app
.use(express.urlencoded({extended:false}))
.use(cookieParser())
.use('/public', express.static(path.resolve("./public")))

.set("view engine","ejs")
.set("views",path.resolve("./views"))
.use("/user",userRouter)
.use("/blog",checkSignedIn,blogRouter)
.use("/",checkSignedIn,staticRouter)


.listen(port,()=>console.log(`Connected to PORT-${port}`))

