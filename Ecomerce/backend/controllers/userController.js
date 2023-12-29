const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const User = require("../models/userModel");
const SendToken = require("../utils/jwtToken");

const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

//Register a user
exports.registerUser = catchAsyncErrors(async(req,res,next)=>{
    const {name,email,password} = req.body;

    const user = await User.create({
        name,email,password,
        avatar:{
            public_id:"This is a Sample ID",
            url:"ProfilePicUrl"
        }
    });

       SendToken(user,201,res);

});

//Login User
exports.loginUser = catchAsyncErrors(async(req,res,next)=>{
    const {email,password} = req.body;

    //Checking if user has given password and email both
    if(!email || !password){
        return next(new ErrorHandler("Please enter Email and Password",400))
    }

    const user = await User.findOne({email}).select("+password");

    if(!user){
        return next(new ErrorHandler("Invalid email or password",401));
    }

    const isPasswordMatched = user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email or password",401));
    }

   SendToken(user,200,res);
});

//Logout user 
exports.logout = catchAsyncErrors(async(req,res,next)=>{
    
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true,
    });

    res.status(200).json({
        success:true,
        message:"Logout successfully",
    })
});

//Forgot Password
exports.forgotPassword = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findOne({email:req.body.email});

    if(!user){
        return next(new ErrorHandler("User not found",404))
    }
    
    //Get ResetPassword Token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    const resetPasswordUrl  = `${req.protocol}://${req.get(
        "host"
        )}/api/v1/password/reset/${resetToken}`;

    const message = `You password reset token is :- \n\n ${resetPasswordUrl}\n\n If you have not requested this email them please ignore it`;

    try{

        await sendEmail({
            email:user.email,
            subject:`Ecommerce Password Recovery`,
            message,
        });

        res.status(200).json({
            success:true,
            message:`Email Sent to ${user.email} successfully`
        })


    }catch(error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });

        return next(new ErrorHandler(error.message,500));
    }
});


//Reset password
exports.resetPassword = catchAsyncErrors(async(req,res,next)=>{

    //Creating token Hash

    const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt:Date.now()},
    })

    if(!user){
        return next(new ErrorHandler("Reset password token has been invalid or has been expired",400));
    }

    if(req.body.password !== req.body.confirmPassword){
        return next (new ErrorHandler("Password does not match",400));      
    }

    user.password = req.body.password;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    SendToken(user,200,res);

})

//Get User Details
exports.getUserDetails  =catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success:true,
        user,
    })   
})

//Update User Password
exports.updatePassword  =catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = user.comparePassword(req.body.oldPassword);

    if(!isPasswordMatched){
        return next(new ErrorHandler("Old password is incorrect",400));
    }

    if(req.body.newPassword != req.body.confirmPassword){
        return next(new ErrorHandler("password does not match",400));
    }

    user.password = req.body.newPassword;

    await user.save();

    SendToken(user,200,res);

    res.status(200).json({
        success:true,
        user,
    })   
})

//Update User Profile
exports.updateProfile  = catchAsyncErrors(async(req,res,next)=>{

    const newUserData = {
        name:req.body.name,
        email:req.body.email,
    };

    //We will add cloudanary later
    const user = await User.findByIdAndUpdate(req.body.id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false,

    });

    res.status(200).json({
        success:true,
        
    });

});

//Get All User (ADMIN)
exports.getAllUser  = catchAsyncErrors(async(req,res,next)=>{

    const user = await User.find();

    res.status(200).json({
        success:true,
        user,
    })

});

//Get Single User Detail (ADMIN)
exports.getUser  = catchAsyncErrors(async(req,res,next)=>{

    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(`User does not exist with id ${req.params.id}`));
    };

    res.status(200).json({
        success:true,
        user,
    })

});

//Update User Role (ADMIN)
exports.updateUserRole  = catchAsyncErrors(async(req,res,next)=>{

    const newUserData = {
        name:req.body.name,
        email:req.body.email,
        role:req.body.role,
    };

    const user = await User.findByIdAndUpdate(req.params.id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false,

    });

    res.status(200).json({
        success:true,
        
    });

});


//Delete User Role (ADMIN)
exports.deleteUser  = catchAsyncErrors(async(req,res,next)=>{

    const user = await User.findById(req.params.id);
    if(!user){
        return next(new ErrorHandler(`User does not exist with id:${req.params.id}`))
    }

    await user.remove();

    res.status(200).json({
        success:true,
        message:"User Deleted Successfully"
        
    });

});