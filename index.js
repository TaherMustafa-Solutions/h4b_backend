const express=require('express')
const bodyParser=require('body-parser')
const cors=require('cors')
const mongoose=require('mongoose')
const fileUpload=require("express-fileupload")
require('dotenv').config()
const port=process.env.PORT
const app=express()
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())

app.listen(port,()=>{
    console.log(`connected at ${port}`)
})


