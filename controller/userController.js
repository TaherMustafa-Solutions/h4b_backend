const User=require("../models/userModel")
const cloudinary=require('cloudinary').v2
const bcrypt=require('bcryptjs')
const Order= require('../models/orderModel')
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
}
catch(err){
    res.json({
        result:false,
        err
    })
}
}
exports.userinfo=(req,res)=>{
    const userId=req.params.id
    Order.find({userId}).populate('userId').then((data)=>{
        if(data.length===0){
            let newspaper=0,magazine=0,cardboard=0,book=0,plastic=0,aluminum=0,iron=0,paper=0;
           User.find({_id:userId}).select("name address email mobile phone_no").then((data1)=>{
              res.json({
                result:true,
                data:{
                    name:data1[0].name,
                    email:data1[0].email,
                    phone_no:data1[0].phone_no,
                    address:data1[0].address,
                    image_url:data1[0].photo.secure_url,
                    newspaper,
                    magazine,
                    cardboard,
                    book,
                    plastic,
                    aluminum,
                    iron,
                    paper
                }
              })
           }).catch((err)=>{
            res.json({
                result:false,
                err
            })
           })
        }
        else{
            let newspaper=0,magazine=0,cardboard=0,book=0,plastic=0,aluminum=0,iron=0,paper=0
           data.map((elem)=>{
                 newspaper+=elem.newspaper.weight
                 magazine+=elem.magazine.weight
                 cardboard+=elem.cardboard.weight
                 book+=elem.book.weight
                 plastic+=elem.plastic.weight
                 aluminum+=elem.aluminum.weight
                 iron+=elem.iron.weight
                 paper+=elem.paper.weight
           })
           res.json({
            result:true,
            ordered:true,
            data:{
            name:data[0].userId.name,
            email:data[0].userId.email,
            phone_no:data[0].userId.phone_no,
            address:data[0].userId.address,
            image_url:data[0].userId.photo.secure_url,
            newspaper,
            magazine,
            cardboard,
            book,
            plastic,
            aluminum,
            iron,
            paper
            }
           })
        }
    }).catch((err)=>{
        res.json({
            result:false,
            err
        })
       })
}