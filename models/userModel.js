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
         default:'users/kyu8aezxo4hgsmdnqwbj.png'  
},
    secure_url:{
        type:String,
        default:'https://res.cloudinary.com/dsxcazh94/image/upload/v1688945408/users/kyu8aezxo4hgsmdnqwbj.png'
    },
   
}, 
phone_no:{
        type:String,
        required:[true,"Phone no. required"],
    },
    address:{
        type:String
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