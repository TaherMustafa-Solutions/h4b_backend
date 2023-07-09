const mongoose=require("mongoose");
const bcrypt=require('bcryptjs')
const user=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is required"]
    },

    email:{
        type:String,
        required:[true,"email is required"],
        unique:[true,"Email is already registered"],
    },

    password:{
        type:String,
        required:[true,'Please provide the password'],
        minLength:[6,'Password should be atleast 6 characters'],
        select:false
    },
    role:{
        type:String,
        default:'User'
    },
    createdAt:{
    type:Date,
    default:Date.now
},
photo:{
    id:{
        type:String,
        // required:true
    },
    secure_url:{
        type:String,
        // required:true
    },
   
}, 
phone_no:{
        type:String,
        required:[true,"Phone no. required"],
    },
    address:{
        city:{
            type:String
        },
        pinCode:{
            type:Number
        },
        street_name:{
            type:String
        }
    },
    recycled_weight:{
        type:Number,
        default:0
    }
})
user.pre('save',async function(){
    this.password=await bcrypt.hash(this.password,10)
})
user.methods.isValidatedPassword=async function(usersendPass){
    return await bcrypt.compare(usersendPass,this.password)
}
module.exports=mongoose.model("User",user)