const express=require("express");
const { createUser,loginUser, getUser } = require("../controller/userController");
const router=express.Router();

router.post("/signup",createUser);
router.post("/login",loginUser);
router.get("/getUser/:id",getUser)
module.exports=router