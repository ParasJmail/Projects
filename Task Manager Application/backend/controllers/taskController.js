const Task = require("../models/taskModel")
const ErrorHandler = require("../utils/errorhandler")
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures")

//Create Task --Admin
exports.createtask = catchAsyncErrors(async (req,res,next)=>{

    req.body.user = req.user.id;

    const task = await Task.create(req.body);

    res.status(201).json({
        success:true,
        task
    });
});

//Get All Tasks
exports.getAlltasks = catchAsyncErrors(async (req,res)=>{

    const resultPerPage = 5;

    const apiFeatures = new ApiFeatures(Task.find(),req.query)
    .search()
    .filter().pagination(resultPerPage);
    
    const tasks = await apiFeatures.query;
    res.status(200).json({
        success:true,
        tasks,
    });
});

//Get Task Details
exports.gettaskDetails = catchAsyncErrors(async(req,res,next)=>{
   
    const task = await Task.findById(req.params.id);


    const taskCount = await Task.countDocuments();

    if(!task){
        return next(new ErrorHandler("task Not Found",404))
    }

    res.status(200).json({
        success:true,
        task,
        taskCount,
    });
});

//Update Product
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
        useFindAndModify:false
    });

    res.status(200).json({
        success:true,
        task
    });
});

//Delete Product
exports.deleteTask = catchAsyncErrors(async(req,res,next)=>{
    const task = await Task.findById(req.params.id);

    if(!task){
        return res.status(500).json({
            success:false,
            message:"Task Not Found"
        });
    }

    await task.remove();

    res.status(200).json({
        success:true,
        message:"Task Delete Successfully"
    });
});
