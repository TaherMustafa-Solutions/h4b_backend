const User = require("../models/userModel");
exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({
        success: false,
        message: "require all element",
      });
    }
    const user = await User.create({
      name,
      email,
      password,
    });

    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(201).json({
      success: false,
      error,
    });
  }
};


exports.userLogin=async(req,res)=>{
 
try {
    const {email,password}=req.body;
    if(!email||!password)
    {
        res.status(400).json({
            success:false,
            message:"all element needed"
        })
    }

    const user=await User.find({email:email,password:password});

    if(!user)
    {
        res.status(400).json({
            success:false,
            message:"user not found"
        })
    }

    res.status(200).json({
        success:true,
        message:"you are login"
    })
} catch (error) {
    res.status(400).json({
        success:false,
        error
    })
}

}
