const express=require("express");
const { createUser,loginUser,userinfo } = require("../controller/userController");
const router=express.Router();

router.post("/signup",createUser);
router.post("/login",loginUser)
router.get('/user/:id',userinfo)
module.exports=router