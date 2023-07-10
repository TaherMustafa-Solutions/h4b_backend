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
     let totalQuantity=newspaper+cardboard+aluminum+iron+paper+book+magazine+plastic
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
        totalQuantity
     })
    
     Order.find({_id:order._id}).populate('userId').then((data)=>{
        User.findOneAndUpdate({_id:userId},{recycled_weight:data[0].userId.recycled_weight+totalQuantity}).then((data1)=>{
            console.log(data1)
             res.json({
            result:true,
            data
        })
        })
       
     })
 
}
exports.orderPending=(req,res)=>{
    Order.find({status:0}).populate('userId').then((data)=>{
        // console.log(data)
        let arr=[]
        let ord=["newspaper","magazine","paper","iron","aluminum","book","plastic","cardboard"]
        let ord1=[]
        data.map((elem)=>{
          ord.map((element)=>{
            ord1.push({
                item:element,
                weight:elem.element.weight,
                rate:elem.element.rate
            })
          })
          console.log(ord1)
            arr.push({
               id:elem._id,
               name:elem.userId.name,
               phone_no:elem.userId.phone_no,
               email:elem.userId.email,
               address:elem.userId.address,
               order_item:ord1
            })
        })
        res.json({
            result:true,
            order:arr
        })
    }).catch((err)=>{
        res.json({
            result:false,
            err
        })
    })
}
exports.orderPicked=(req,res)=>{
    const {orderid,status}=req.body
    if(status===1){
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
    else{
        Order.findOneAndDelete({_id:orderid}).then(()=>{
            res.json({
                result:true,
                "message":"Deleted"
            })
        })
    }
    
}