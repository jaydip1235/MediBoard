const User = require("../models/User");

exports.getPrivateData= (req, res, next) => {
    res.status(200).json({
        sucess: true,
        data:"Got private data"
    })
}

exports.findUser = async (req, res, next) => {
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
        return next(new ErrorResponse("User not found or not verified :(", 404));
    }
}catch(err){
    next(err);
}
}

exports.editUser = async (req, res, next) => {
    
    const idp = req.params.userId;
    //let user = await User.findOne({userID: id})

    console.log(req.body.params2)

    if(typeof req.body.params1 === "undefined"){
        params1 =100000
    }
    else{
        params1 = parseInt(req.body.params1)
    }
    if(typeof req.body.params2 === "undefined"){
        params2 =100000
    }
    else{
        params2 = parseInt(req.body.params2);
    }

    console.log(params2)
    if(typeof req.body.bloodGroup === "undefined"){
        bloodGroup= ""
    }
    else{
        bloodGroup = (req.body.bloodGroup);
    }
    
    const updateUser = {
        username: req.body.username,
        phone : req.body.phone,
        email : req.body.email,
        moreInfo : req.body.moreInfo
    }

    let userr = await User.findOne({userID : idp})

    let updation = await User.findOneAndUpdate({userID : idp},{
        $push : {
            param1 :  params1,
             param2 :   params2,
        },
        // $push : {
        //     param2 :  params2,
        // },
         bloodGroup : bloodGroup,
         $set : updateUser
    },{  safe: true, upsert: true})


    // updation = await User.findOneAndUpdate({userID : idp},{
    //     $push : {
    //         param2 :  params2,
    //     },
    //      bloodGroup : bloodGroup,
    //      $set : updateUser
    // },{new: true})
    console.log(params1)
    console.log(updation.param1)
    console.log(params2)
    console.log(updation.param2)
    res.status(200).json({
        result : 'User Update is success',
        newU : updation
    });
}

exports.deleteUser =async (req, res, next) => {
    const idp = req.params.userId;

    const deletedUser = await User.findOneAndDelete({userID : idp})
    console.log(deletedUser)
    res.status(200).json({"success" : true})
}


exports.deleteUser =async (req, res, next) => {
    const idp = req.params.userId;

    const deletedUser = await User.findOneAndDelete({userID : idp})
    console.log(deletedUser)
    res.status(200).json({"success" : true})
}