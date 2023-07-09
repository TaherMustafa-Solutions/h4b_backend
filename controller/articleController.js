const Article=require('../models/articleModel')
const cloudinary=require('cloudinary').v2
exports.article=async(req,res)=>{
    if(!req.files){
        res.json({
            result:false
        })
        
    }
    else{
      const {title,content}=req.body
      if(!title){
        res.json({
            result:false
        })
      }
     else{
        const file=req.files.image
        let arr=[]
        // console.log(file)
//          file.map((elem)=>{
//             cloudinary.uploader.upload(elem.tempFilePath,{
//                 folder:'articleImages',
//                 crop:"scale"
//             }).then((result)=>{
//                 console.log(result)
//                 arr.push(result.secure_url)
//             })
        
            
// })
let i;
for(i=0;i<file.length;i++)
{
    cloudinary.uploader.upload(file[i].tempFilePath,{
                        folder:'articleImages',
                        crop:"scale"
                    }).then((result)=>{
                        console.log(result)
                        arr.push(result.secure_url)
                    })
}
        console.log("hello world")
     const article=await Article.create({
        title,
        content,
        image:arr
     })
     article.image=arr
     res.json({
        result:true,
        article
     })
     }
    
    }
}
exports.allarticles=async(req,res)=>{
    Article.find({}).then((data)=>{
        res.json({
          result:true,
          data
        })
    }).catch((err)=>{
        res.json({
            result:false,
            err
        })
    })
}