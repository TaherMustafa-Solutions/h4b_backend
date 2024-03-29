const mongoose=require('mongoose')
const orderSchema=new mongoose.Schema({
    newspaper:{
        weight:{
            type:Number,
            default:0,
        },
        rate:{
            type:Number,
            default:0
        }
    },
   
    cardboard:{
        weight:{
            type:Number,
            default:0,
        },
        rate:{
            type:Number,
            default:0
        }
    },
    aluminum:{
        weight:{
            type:Number,
            default:0,
        },
        rate:{
            type:Number,
            default:0
        }
    },
    iron:{
        weight:{
            type:Number,
            default:0,
        },
        rate:{
            type:Number,
            default:0
        }
    },
    paper:{
        weight:{
            type:Number,
            default:0,
        },
        rate:{
            type:Number,
            default:0
        }
    },
    book:{
        weight:{
            type:Number,
            default:0,
        },
        rate:{
            type:Number,
            default:0
        }
    },
    magazine:{
        weight:{
            type:Number,
            default:0,
        },
        rate:{
            type:Number,
            default:0
        }
    },
    plastic:{
        weight:{
            type:Number,
            default:0,
        },
        rate:{
            type:Number,
            default:0
        }
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    status:{
        type:Number,
        default:0
    },
    totalQuantity:{
        type:Number,
        default:0
    }
})
module.exports=mongoose.model("Order",orderSchema)