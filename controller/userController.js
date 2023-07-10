const User=require("../models/userModel")
const cloudinary=require('cloudinary').v2
const bcrypt=require('bcryptjs')
exports.createUser=async(req,res)=>{

    try {
        const {name,email,password,address,phone_no}=req.body;
         let result
        if(!name||!email||!password||!phone_no)
        {
            res.status(400).json({
                success:false,
                error:"require all element"
            })
        }
        const user=await User.create({
            name,
            email,
            password,
            phone_no,
            address,
           
        })
        user.password=undefined
        res.status(201).json({
            result:true,
            id:user._id,
        })
    } catch (error) {
        res.status(201).json({
            result:false,
            error
        })
    }
}
exports.loginUser=async(req,res)=>{
     const {email,password}=req.body
     try{
     if(!email || !password){
        res.json({
            result:false,
            message:"Email or Password Missing"
        })
     }
     else{
        User.find({email}).then(async(data)=>{
            if(data.length===0){
                res.json({
                    result:false,
                    message:"not_found"
                })
            }
            else{
                const result=await bcrypt.compare(password,data[0].password)
                if(result==true){
                    res.json({
                        result:true,
                        id:data[0]._id
                    })
                }
                else{
                    res.json({
                        result:false,
                        message:"wrong_password"
                    })
                }
            }
        })
     }
    }
    catch(err){
      res.josn({
        result:"Server error"
      })
    }
}
exports.userinfo=(req,res)=>{
    const _id=req.params.id
    User.find({_id}).then((data)=>{
        res.json({
            result:true,
            data:data[0].email,
        })
    }).catch((err)=>{
        res.json({
            result:false,
            err
        })
    })
}