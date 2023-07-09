const express=require('express')
const router=express.Router()
const {order,orderPending,orderPicked}=require('../controller/orderController')
router.post('/order/:id',order)
router.get('/orderPending',orderPending)
router.post('/orderPicked',orderPicked)
module.exports=router