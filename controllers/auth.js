const crypto = require("crypto");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");
const config = require("../config/config");
const client = require("twilio")(config.accountSID, config.authToken);

exports.register = async (req, res, next) => {
  const { username, email, phone, password } = req.body;


  var characters =
    "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var result = "";
  var charactersLength = characters.length;
  while (true) {
    for (var i = 0; i < 5; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    let user = await User.findOne({ userID: result });
    if (user != null) {
      result = "";
      continue;
    } else {
      break;
    }
  }

  try {
    console.log("asasas");
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password,
      userID: result,
    });
    console.log(user);
    let ph = parseInt("91" + user.phone);

    await client.verify
      .services(config.serviceID)
      .verifications.create({
        to: `+91${req.body.phone}`,
        channel: "sms",
      })
      .then((data) => {
        res.status(200).send("Success");
      });

    //res.status(200).json({success:true})
  } catch (error) {
    next(error);
  }
};

exports.verify = async (req, res, next) => {
  console.log("st");
  const { phone } = req.params;
  const user = await User.findOne({ phone });

  try {
    await client.verify
      .services(config.serviceID)
      .verificationChecks.create({
        to: `+91${req.params.phone}`,
        code: req.body.code,
      })
      .then((data) => {
        console.log(data.valid);
        if (data.valid === false) {
          console.log("asdbjasdhgjsda");
          return res.send(500).send("Something went wrong");
        } else {
          user.verified = true;
          //sendToken(user, 201, res)
          res.status(200).send("Done");
          user.save();
          console.log(user);
        }
      });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.send(500).send("Something went wrong");
  }
  try {
    const user = await User.findOne({ email }).select("+password");
    console.log(user.verified);
    console.log(user);
    if (!user) {
      return res.send(500).send("Something went wrong");
    }
    if (user.verified == false) {
        return res.send(500).send("Something went wrong");
    }
    const isMatch = await user.matchPasswords(password);

    if (!isMatch) {
      return res.send(500).send("Something went wrong");
    }
    sendToken(user, 200, res);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

exports.forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      console.log("hh1");
      return res.send(500).send("Something went wrong");
    }
    console.log("hh2");
    const resetToken = user.getResetPasswordToken();

    await user.save();

    const resetUrl = `https://medi-board.herokuapp.com/passwordreset/${resetToken}`;

    const message = `
            <h1>You have requested a new password reset</h1>

            <p>Please go to this link to reset your password</p>

            <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
        `;
    console.log("hh3");

    try {
      await sendEmail({
        to: user.email,
        subject: "Password reset request",
        text: message,
      });

      console.log("hh4");
      res.status(200).json({ success: true, data: "Email sent" });
    } catch (error) {
      user.resetpasswordToken = undefined;
      user.resetpasswordExpire = undefined;
      await user.save();
      console.log(error.message);
      return res.send(500).send("Something went wrong");
    }
  } catch (error) {
    next(error);
  }
};

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
      return res.send(500).send("Something went wrong");
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

const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken();
  res.status(statusCode).json({ success: true, token });
};


exports.findUser = async(req, res, next) => {
    const id = req.params.userId
    console.log(req.params)
    console.log("asdsad")
    try{
    let user = await User.findOne({userID: id})
    
    console.log(user)
    if(user!=null && user.verified == true){
        res.status(200).json(user)
    }
    else{
      return res.send(500).send("Something went wrong");

    }
}catch(err){
    next(err);
}
}

// exports.editUser = async (req, res, next) => {
    
//     const idp = req.params.userId;
//     //let user = await User.findOne({userID: id})

//     console.log(req.body.params2)

//     if(typeof req.body.params1 === "undefined"){
//         params1 =100000
//     }
//     else{
//         params1 = parseInt(req.body.params1)
//     }
//     if(typeof req.body.params2 === "undefined"){
//         params2 =100000
//     }
//     else{
//         params2 = parseInt(req.body.params2);
//     }

//     console.log(params2)
//     if(typeof req.body.bloodGroup === "undefined"){
//         bloodGroup= ""
//     }
//     else{
//         bloodGroup = (req.body.bloodGroup);
//     }
    
//     const updateUser = {
//         username: req.body.username,
//         phone : req.body.phone,
//         email : req.body.email,
//         moreInfo : req.body.moreInfo
//     }

//     let userr = await User.findOne({userID : idp})

//     let updation = await User.findOneAndUpdate({userID : idp},{
//         $push : {
//             param1 :  params1,
//              param2 :   params2,
//         },
//         // $push : {
//         //     param2 :  params2,
//         // },
//          bloodGroup : bloodGroup,
//          $set : updateUser
//     },{  safe: true, upsert: true})


    // updation = await User.findOneAndUpdate({userID : idp},{
    //     $push : {
    //         param2 :  params2,
    //     },
    //      bloodGroup : bloodGroup,
    //      $set : updateUser
    // },{new: true})
//     console.log(params1)
//     console.log(updation.param1)
//     console.log(params2)
//     console.log(updation.param2)
//     res.status(200).json({
//         result : 'User Update is success',
//         newU : updation
//     });
// }

// exports.deleteUser =async (req, res, next) => {
//     const idp = req.params.userId;

//     const deletedUser = await User.findOneAndDelete({userID : idp})
//     console.log(deletedUser)
//     res.status(200).json({"success" : true})
// }

exports.sendContact = async (req, res, next)=>{
  let email = req.body.email;
  let message = req.body.message;

  let textmsg = `
  <h1>${email}</h1>
  <br>
  <p>${message}</p>
  `
  try {
    await sendEmail({
      to: "noreply.mediboard@gmail.com",
      subject: "Mediboard Contact",
      text: textmsg,
    });
    res.status(200).json({ success: true, data: "Email sent" });
  } catch(error){
    next(error);
  }
}

exports.resend = async (req,res,next) => {
  try{
    await client.verify
    .services(config.serviceID)
    .verifications.create({
      to: `+91${req.params.phone}`,
      channel: "sms",
    })
    .then((data) => {
      next();
      res.status(200).send("Success");
    });

    
  }catch(error) {
    next(error);
  }
  
}