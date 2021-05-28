const crypto = require('crypto')
const User = require('../models/User')
const ErrorResponse = require('../utils/ErrorResponse')
const sendEmail = require('../utils/sendEmail')
const config = require('../config/config')
const client = require("twilio")(config.accountSID, config.authToken)


exports.register = async(req, res, next) =>{
    const {username,email,phone,password} = req.body
    try{
        console.log("asasas")
        const user = await User.create({username,email,phone,password})
        let ph = parseInt("91"+user.phone)

    await client.verify.services(config.serviceID)
    .verifications
    .create({
        to : `+${req.body.phone}`,
        channel : "sms"
    })
    .then((data)=>{
        res.status(200).send("Success")
    })

    //res.status(200).json({success:true})
       
        
    }
    catch(error){
        next(error)
    } 
}

exports.verify = async(req, res, next)=>{
    console.log("st")
    const {phone} = req.params;
    const user = await User.findOne({phone})

    try{
    await client.verify.services(config.serviceID)
    .verificationChecks.create({
        to : `+${req.params.phone}`,
        code : req.body.code
    })
    .then((data)=>{
        console.log(data.valid)
        if(data.valid===false){
            console.log("asdbjasdhgjsda")
            return next(new ErrorResponse("Invalid token",400));
        }
        else{
        user.verified = true;
        //sendToken(user, 201, res)
        res.status(200).send("Done");
        user.save()
        console.log(user)
        }
    })}
    catch(error){
        next(error)
    }
}


exports.login = async(req, res, next) =>{
    const {email,password} = req.body;


    if(!email || !password ){
        return next(new ErrorResponse("Please provide an email and password",400));
    }
    try{
        const user = await User.findOne({email}).select("+password")
        console.log(user.verified)
        console.log(user)
        if(!user){
            return next(new ErrorResponse("Invalid credentials",401));
        }
        if(user.verified==false){
            return next(new ErrorResponse("User didnot verified his/her phone number",401));
        }
        const isMatch = await user.matchPasswords(password);

        if(!isMatch){
            return next(new ErrorResponse("Invalid credentials",401));
        }
        sendToken(user, 200, res)
    }catch(error){
        console.log(error.message)
        next(error)
    }

 }
 

 exports.forgotPassword = async(req, res, next) =>{
     const {email} = req.body;

     try{ 

        const user = await User.findOne({email})

        if(!user){
            console.log("hh1")
            return next(new ErrorResponse("Email could not be sent",404))
        }
        console.log("hh2")
        const resetToken = user.getResetPasswordToken();

        await user.save();

        const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;

        const message = `
            <h1>You have requested a new password reset</h1>

            <p>Please go to this link to reset your password</p>

            <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
        `
        console.log("hh3")

        try{
            await sendEmail ({ 
                to : user.email,
                subject : "Password reset request",
                text : message
            })

            console.log("hh4")
            res.status(200).json({success:true,data:"Email sent"})
        }catch(error){
            user.resetpasswordToken = undefined;
            user.resetpasswordExpire = undefined;
            await user.save();
            console.log(error.message)
            return next(new ErrorResponse("Email could not be sent",500))
        }
     }catch(error){
        next(error);
     }
    
 }

 exports.resetPassword = async (req, res, next) => {
    // Compare token in URL params to hashed token
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.resetToken)
      .digest("hex");
  
    try {
      const user = await User.findOne({
        resetPasswordToken,

      });
  
      if (!user) {
        return next(new ErrorResponse("User not registered", 400));
      }
  
      user.password = req.body.password;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
  
      await user.save();
  
      res.status(201).json({
        success: true,
        data: "Password Updated Success",
        token: user.getSignedToken(),
      });
    } catch (err) {
      next(err);
    }
  };

 const sendToken = (user,statusCode,res)=>{
     const token  = user.getSignedToken();
     res.status(statusCode).json({success:true,token})
 }