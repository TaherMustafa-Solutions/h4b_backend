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
conectdatabase();
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())

app.get("/",(req,res)=>{
    res.status(200).json({
        success:true
    })
})

app.use("/api",userRouter)

app.listen(port,()=>{
    console.log(`connected at ${port}`)
})


