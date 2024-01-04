const mongoose = require("mongoose");

//Schema
const taskSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter task name"],
        trim:true
    },
    description:{
        type:String,
        required:[true,"Please enter task description"]
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
        required:[true,"Please Enter Task Category"],

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

module.exports = mongoose.model("Task",taskSchema);