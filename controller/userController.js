const User=require("../models/userModel")
exports.createUser=async(req,res)=>{

    try {
        const {name,email,password}=req.body;

        if(!name||!email||!password)
        {
            res.status(400).json({
                success:false,
                message:"require all element"
            })
        }
        const user=await User.create({
            name,
            email,
            password
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