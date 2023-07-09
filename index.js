const express=require('express')
const bodyParser=require('body-parser')
const cors=require('cors')
const mongoose=require('mongoose')
const fileUpload=require("express-fileupload")
require('dotenv').config()
const port=process.env.PORT
const app=express()
const {conectdatabase}=require("./config/db");
const userRouter = require('./routes/userRoute')
const cloudinary=require('cloudinary').v2
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})
conectdatabase();
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())
app.use(fileUpload({
    tempFileDir:'/tmp/',
    useTempFiles:true
}))
app.use("/api/v1",userRouter)
app.set('view engine','ejs')
app.get('/testing',(req,res)=>{
    res.render('postForm')
})
const articleRouter=require('./routes/articleRoute')
app.use("/api/v1",articleRouter)

app.listen(port,()=>{
    console.log(`connected at ${port}`)
})


