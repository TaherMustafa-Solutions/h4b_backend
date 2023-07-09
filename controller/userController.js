const User=require("../models/userModel")
const cloudinary=require('cloudinary').v2
const bcrypt=require('bcryptjs')
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
        user.password=undefined
        res.status(201).json({
            result:true,
            id:user._id
        })
    } catch (error) {
        res.status(201).json({
            success:false,
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
   catch (err) {
    res.josn({
      result: "Server error",
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findOne({ _id: userId });
    if (!user) {
      res.json({
        result: false,
        message: "userId not found",
      });
    }
    res.json({
      result: true,
      user,
    });
  } catch (error) {
    res.json({
      result: "server error",
    });
  }
};
