const mongoose=require('mongoose')
const itemSchema=new mongoose.Schema({
    itemName:{
        type:String,
        unique:[true,"This item is already added"],
    },
    price:{
        type:Number
    }
})