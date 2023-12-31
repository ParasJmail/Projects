const Task = require("../models/taskModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");


//Create Task
exports.createTask = catchAsyncErrors(async(req,res,next)=>{
    
    req.body.user = req.user;

    const task  = await Task.create(req.body);

    res.status(201).json({
        success:true,
        task
    });
});

//Get All tasks
exports.getAllTasks= catchAsyncErrors(async(req,res,next)=>{
    const resultPerPage = 5;
    const taskCount = await Task.countDocuments();

    const apifeatures = new ApiFeatures(Task.find(),req.query)
        .search()
        .filter().pagination(resultPerPage);

    const tasks = await apifeatures.query;

    res.status(200).json({
        success:true,
        tasks,
    });

});

//Get Task Details
exports.getTaskDetails = catchAsyncErrors(async(req,res,next)=>{
    const task = await Task.findById(req.params.id);

    taskCount = await Task.countDocuments();

    if(!task){
        return next(new ErrorHandler("Task Not Found",404))
    };

    res.status(200).json({
        success:true,
        task,
        taskCount,
    });
});

//Update Tasks
exports.updateTask = catchAsyncErrors(async (req,res,next)=>{

    let task = Task.findById(req.params.id);

    if(!task){
        return res.status(500).json({
            success:false,
            message:"task Not Found"
        });
    }



    task = await Task.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false,
        
    });


    res.status(200).json({
        success:true,
        task,
    });

});

//Delete Task
exports.deleteTask = catchAsyncErrors(async(req,res,next)=>{
    
    const task = await Task.findById(req.params.id);


    if(!task){
        return res.status(500).json({
            success:false,
            message:"task Not Found"
        });
    }

    await task.deleteOne();

    res.status(200).json({
        success:true,
        message:"Task Deleted Successfully"
    });
});