const Order=require('../models/orderModel')
const User=require('../models/userModel')
exports.order=async(req,res)=>{
    const userId=req.params.id
    let {newspaper,cardboard,aluminum,iron,paper,book,magazine,plastic}=req.body
     newspaper=newspaper?+newspaper:0
     cardboard=cardboard?+cardboard:0
     aluminum=aluminum?+aluminum:0
     iron=iron?+iron:0
     paper=paper?+paper:0
     book=book?+book:0
     magazine=magazine?+magazine:0
     plastic=plastic?plastic:0
     const order=await Order.create({
        newspaper:{
            weight:newspaper,
            rate:14*newspaper
        },
        cardboard:{
            weight:cardboard,
            rate:5*cardboard
        },
        aluminum:{
            weight:aluminum,
            rate:105*aluminum
        },
        iron:{
            weight:iron,
            rate:iron*26
        },
        paper:{
            weight:paper,
            rate:15*paper
        },
        book:{
            weight:book,
            rate:12*book
        },
        magazine:{
            weight:magazine,
            rate:15*magazine
        },
        plastic:{
            weight:plastic,
            rate:10*plastic
        },
        userId,
        totalQuantity:newspaper+cardboard+aluminum+iron+paper+book+magazine+plastic
     })
     Order.find({_id:order._id}).populate('userId').then((data)=>{
        
        res.json({
            result:true,
            data
        })
     })
 
}
exports.orderPending=(req,res)=>{
    Order.find({status:0}).populate('userId').then((data)=>{
        console.log(data)
        let arr=[]
        data.map((elem)=>{
            arr.push({
               id:elem._id,
               name:elem.userId.name,
               phone_no:elem.userId.phone_no,
               email:elem.userId.email,
               address:elem.userId.address
            })
        })
        res.json({
            result:true,
            data:arr
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