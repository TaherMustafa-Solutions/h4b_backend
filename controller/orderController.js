const Order=require('../models/orderModel')
const User=require('../models/userModel')
exports.order=async(req,res)=>{
    const userId=req.params.id
    console.log(userId)
    let {newspaper,cardboard,aluminium,iron,paper,book,magazine,bottle}=req.body
     newspaper=newspaper?+newspaper:0
     cardboard=cardboard?+cardboard:0
     aluminium=aluminium?+aluminium:0
     iron=iron?+iron:0
     paper=paper?+paper:0
     book=book?+book:0
     magazine=magazine?+magazine:0
     bottle=bottle?bottle:0
     const order=await Order.create({
        newspaper,
        cardboard,
        aluminium,
        iron,
        paper,
        book,
        magazine,
        bottle,
        userId,
        totalQuantity:newspaper+cardboard+aluminium+iron+paper+book+magazine+bottle
     })
     Order.find({_id:order._id}).populate('userId').then((data)=>{
        
        res.json({
            result:true,
            data
        })
     }).catch((err)=>{
        res.json({
            result:false
        })
     })
 
}
exports.orderPending=(req,res)=>{
    Order.find({status:0}).then((data)=>{
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
exports.orderPicked=(req,res)=>{
    const {orderid}=req.body
    Order.findOneAndUpdate({_id:orderid},{status:1}).populate("userId").then((data)=>{
        console.log(data)
       User.findOneAndUpdate({_id:data.userId._id},{recycled_weight:data.userId.recycled_weight+data.totalQuantity})
       .then((data1)=>{
        res.json({
        result:true,
        data:data
       }).catch((err)=>{})
    })
    })
}