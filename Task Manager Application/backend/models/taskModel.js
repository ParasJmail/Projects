const mongoose = require("mongoose");

//Schema
const taskSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter product name"],
        trim:true
    },
    description:{
        type:String,
        required:[true,"Please enter product description"]
    },
    images:[
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        }
    ],
    category:{
        type:String,
        required:[true,"Please Enter Product Category"],

    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"user",
        required:true,
    },
    crateAt:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model("Product",taskSchema);