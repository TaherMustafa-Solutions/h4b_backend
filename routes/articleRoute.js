const {article,allarticles} =require('../controller/articleController')
const express=require('express')
const router=express.Router()
router.get('/article',allarticles)
router.post('/article',article)


module.exports=router