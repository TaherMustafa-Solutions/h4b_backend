const User=require('../models/userModel')
exports.leaderboard=async(req,res)=>{
    User.find({}).sort({recycled_weight:'desc'}).then((data)=>{
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