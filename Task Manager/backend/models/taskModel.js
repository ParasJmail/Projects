const mongoose = require("mongoose");

//Schema
const taskSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter task name"],
        trim:true
    },
    createdBy:{
        type:String,
        required:[true,"Please enter Creator name"],
    },
    description:{
        type:String,
        required:[true,"Please enter task description"],
        
    },
    status:{
        type:String,
        required:true,
        default:"Processing",
    },	
    createdAt:{
        type:Date,
        default:Date.now(),
    },	
    updatedAt:{
        type:Date,
        default:Date.now()
    },	
    plannedStartDate:{
        type:Date,
    },
    plannedEndDate:{
        type:Date,
    },
    actualStartDate:{
        type:Date,
    },
    actualEndDate:{
        type:Date,
    },
    content:{
        type:String,
    }
});

module.exports = mongoose.model("Task",taskSchema);


















//Model Schema


//Id	                The unique id to identify the task.
//User Id	            The user id to identify the corresponding user.
//Created By        	The user id to identify the user who added the task.
//Updated By	        The user id to identify the user who updated the task.
//Description	        The description of the Task.
//Status	            The status of the task can be New, In-Progress, or Completed.
//Hours	                The total hours consumed by the Task. It can either be manually filled or updated on activity completion.
//Created At	        It stores the date and time at which the task is created.
//Updated At	        It stores the date and time at which the task is updated.
//Planned Start Date	It stores the date and time at which the task is planned to start.
//Planned End Date	    It stores the date and time at which the task is planned to end.
//Actual Start Date	    It stores the actual date and time at which the task started.
//Actual End Date	    It stores the actual date and time at which the task finished.
//Content	            The column used to store the task details.