const mongoose=require('mongoose')
const {isEmail}=require('validator')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is Required"]
    },
    email:{
        type:String,
        validate: [ isEmail, 'invalid email' ],
        required:[true,'Email is required'],
        unique:[true,"Already Registered Email"]
    },
    password:{
        type:String,
        required:[true,"Password is required"]
    }
})