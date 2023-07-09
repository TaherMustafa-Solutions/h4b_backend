const User=require("../models/userModel")
const cloudinary=require('cloudinary').v2
exports.createUser=async(req,res)=>{

    try {
        const {name,email,password,address,phone_no}=req.body;
         let result
         console.log(req.files)
         if(!req.files){
            res.status(400).json({
                error:"Profile photo Required",
            })
         }
        if(!name||!email||!password||!phone_no)
        {
            res.status(400).json({
                success:false,
                error:"require all element"
            })
        }
        const file=req.files.profile
        result=await cloudinary.uploader.upload(file.tempFilePath,{
            folder:'users',
            width:150,
            crop:"scale"
        })
        const user=await User.create({
            name,
            email,
            password,
            phone_no,
            address,
            photo:{
                id:result.public_id,
                secure_url:result.secure_url
            }
        })
        res.status(201).json({
            success:true,
            user
        })
    } catch (error) {
        res.status(201).json({
            success:false,
            error
        })
    }



}