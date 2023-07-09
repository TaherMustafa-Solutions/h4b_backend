const mongoose=require('mongoose')

const articleSchema=new mongoose.Schema({
   title:{
    type:String,
    required:true
   },
   content:{
     type:String
   },
  image:{
    type:[String]
  } ,
  created_at:{
    type:Date,
    default:Date.now
  }
})

module.exports=mongoose.model('Article',articleSchema)