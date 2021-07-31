const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");
const Post=require('../models/Post');
exports.getPrivateData= (req, res, next) => {
    res.status(200).json({
        sucess: true,
        data:"Got private data",
        user:req.user
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
//         moreInfo : req.body.moreInfo,
//         image: req.body.image
//     }

//     let userr = await User.findOne({userID : idp})

//     let updation = await User.findOneAndUpdate({userID : idp},{
//         $push : {
//             param1 :  {val : params1, updated : new Date()},
//             param2 :   {val : params2, updated : new Date()}
//         },
//          bloodGroup : bloodGroup,
//          $set : updateUser
//     },{  safe: true, upsert: true})


//     // updation = await User.findOneAndUpdate({userID : idp},{
//     //     $push : {
//     //         param2 :  params2,
//     //     },
//     //      bloodGroup : bloodGroup,
//     //      $set : updateUser
//     // },{new: true})
//     console.log(params1)
//     console.log(updation.param1)
//     console.log(params2)
//     console.log(updation.param2)
//     res.status(200).json({
//         result : 'User Update is success',
//         newU : updation
//     });
// }


exports.editUser = async (req, res, next) => {
    
    const idp = req.params.userId;
    //let user = await User.findOne({userID: id})

    console.log(req.body.params2)

    if(isNaN(req.body.params1) || (req.body.params1=="")){
        params1 =100000
    }
    else{
        params1 = parseInt(req.body.params1)
    }
    if(isNaN(req.body.params2)||req.body.params2==""){
        params2 =100000
    }
    else{
        params2 = parseInt(req.body.params2);
    }

    console.log(params2)
    if(req.body.bloodGroup==""){
        bloodGroup= ""
    }
    else{
        bloodGroup = (req.body.bloodGroup);
    }


    
    const updateUser = {
        username: req.body.username,
        phone : req.body.phone,
        email : req.body.email,
        moreInfo : req.body.moreInfo,
        image : req.body.image
    }

    let updation = await User.findOneAndUpdate({userID : idp},{
        $push : {
            param1 :  {val : params1, updated : new Date()},
            param2 :   {val : params2, updated : new Date()}
        },
        // $push : {
        //     param2 :  params2,
        // },
         bloodGroup : bloodGroup,
         $set : updateUser
    },{  safe: true, upsert: true})

    let userr = await User.findOne({userID : idp})
    userr.param1 = userr.param1.filter(item=>item.val<1000);
    userr.markModified('param1');
    userr.param2 = userr.param2.filter(item=>item.val<1000);
    userr.markModified('param2');
    await userr.save();

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
    console.log("random",idp);
    const deletedUser = await User.findOneAndDelete({userID : idp})
    console.log(deletedUser)
    res.status(200).json({"success" : true})
}
exports.doctor = async(req, res, next)=>{
    console.log("asasasa");
    const userid = req.params.userid;
    const doctor = req.params.doctor;
    const doctordate = req.params.date;
    const time = req.params.time;

    

    try{
    const user = await User.findOne({userID : userid})



    if(new Date()<user.doctor.dateAssigned){
        return res.status(401).send("Doctor cannot be reassigned within 24 hours")
    }

    user.doctor.name = doctor
    let date = new Date();
    date.setDate(date.getDate() + 1);

    user.doctor.dateAssigned = date
    user.markModified('doctor');
    await user.save();

    const message = `
    <h2>${user.username}</h2>
    <h2>${doctor}</h2>
    <h2>${time}</h2>
    <h2>${doctordate}</h2>
    `

    await sendEmail({
        to: ["archanbanerjee89@gmail.com", "jaydipdey2807@gmail.com",user.email],
        subject: "Doctor assigned",
        text: message,
      });

      res.status(200).json({"success" : true})

    } catch (error){
        next(error);
    }
    
}

exports.need = async(req, res, next) => {
    if (!req.body.content&&!req.body.title) {
        console.log("Content cannot be empty");
        return res.sendStatus(400);
    }
 
    var postData = {
        content: req.body.content,
        title:req.body.title,
        postedBy: req.user
    }
 
    Post.create(postData)
    .then(async newPost => {
        newPost = await User.populate(newPost, { path: "postedBy" })
        res.status(201).send(newPost);
    })
    .catch(error => {
        console.log(error);
        res.sendStatus(400);
    })
}
 
 
 
 
exports.getMyPost = async(req, res, next) => {
 try{
     let posts = await Post.find({postedBy : req.user._id});
     await User.populate(posts,{
        path:'postedBy'
    })
     return res.status(200).json(posts);
 
 }catch(error){
    console.log(error);
    return res.status(500).send("Something went wrong")
 }
}
 
exports.getOthersPost = async(req, res, next) => {
    console.log("hiii123");
    try{
        let posts = await Post.find({postedBy :{ $nin: req.user._id}});
        await User.populate(posts,{
            path:'postedBy'
        })
        return res.status(200).json(posts);
   
    }catch(error){
       console.log(error);
       return res.status(500).send("Something went wrong")
    }
   }
   
 
exports.needDelete= async (req, res, next) => {
 
    let postt = await Post.findOne({_id: req.params.id});
 
    await User.populate(postt, { path: "postedBy" })
 
 
    console.log(req.user._id)
    console.log(postt.postedBy._id)
    if(req.user._id.trim == postt.postedBy._id.trim ) {
        console.log("In if")
        await Post.findByIdAndDelete(req.params.id)
        .then(() =>   res.status(200).json({"success" : true}))
        .catch(error => {
            next(error)
            console.log(error);
        })
    }
    else{
        console.log("In else")
        res.status(401).send("Unauthorized user");
    }
}
 
exports.needAccept = async (req, res, next) => {
    console.log('accepted');
    
    let postt = await Post.findOne({_id: req.params.id});
 
    await User.populate(postt, { path: "postedBy" })
 
    let accptorMail = req.user.email;
    let acceptorName  = req.user.username;
    let acceptorPhone = req.user.phone
    let postMail = postt.postedBy.email;
    let postName = postt.postedBy.username;
    let postPhone = postt.postedBy.phone;
 
    console.log(req.user._id)
    console.log(postt.postedBy._id)
    if(req.user._id != postt.postedBy._id ) {
        console.log("In if")
        await Post.findByIdAndDelete(req.params.id)
        .then(() =>   res.status(200).json({"success" : true}))
        .catch(error => {
            console.log(error);
            next(error);
        })
        const message = `
        <h1>Receipent Details</h1>
    <h3>Email : ${accptorMail}</h3>
    <h3>Name : ${acceptorName}</h3>
    <h3>Phone: ${acceptorPhone}</h3>
    <br>
    <hr>
    <br>
    <h1>Posted Person's details</h1>
    <h3>Email : ${postMail}</h3>
    <h3>Name : ${postName}</h3>
    <h3>Phone: ${postPhone}</h3>
    `
 
    await sendEmail({
        to: [accptorMail,postMail],
        subject: "Needs accepted",
        text: message,
      });
 
    }
    else{
        console.log("In else")
        res.status(404).send("You can't accept your own post");
        
    }
}