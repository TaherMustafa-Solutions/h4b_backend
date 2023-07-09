const mongoose =require("mongoose");

exports.conectdatabase=()=>{

    mongoose.connect(process.env.MOGO_PORT)
    .then((con)=>console.log(`database connected`))
    .catch((err)=>console.log(err));
}