const crypto = require('crypto')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt= require('jsonwebtoken')


const UserSchema = new mongoose.Schema({
    username:{
        type : String,
        required : [true,"Please provide a username"]
    },
    email: {
        type : String,
        required : [true,"Please provide email address"],
        unique : true,
        match : [
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, "Please provide a valid email address"
        ]
    },
    phone: {
        type : String,
        required : [true,"Please provide a phone no."],
        unique:true
    },
    userID : {
        type : String,
        required : false
    },

    bloodGroup : {
        type : String,
        required : false
    },
    param1 : [{
        val : Number,
        updated : Date
    }],
    param2 : [{
        val : Number,
        updated : Date
    }],

    moreInfo : {
        type : String,
        required : false
    },

    image:{
        type: String,
        required:true,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTOkHm3_mPQ5PPRvGtU6Si7FJg8DVDtZ47rw&usqp=CAU"
    },

    doctor:{
        name:String,
        dateAssigned: Date
    },

    password: {
        type : String,
        required : [true,"Please provide a password"],
        minlength : 6,
        select : false
    },
    verified : {
        type : Boolean,
        default : false
    },
    resetPasswordToken : String,
    resrtPasswordExpire : Date
},{timestamps: true})

UserSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    next();
})

UserSchema.methods.matchPasswords = async function(password){
    return await bcrypt.compare(password,this.password)
}
UserSchema.methods.getSignedToken = function(){ 
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{ expiresIn:process.env.JWT_EXPIRE})
    
}


UserSchema.methods.getResetPasswordToken = function(){
    const resetToken = crypto.randomBytes(20).toString("hex")
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex")
    this.resrtPasswordExpire = Date.now() + 10*(60*1000) //10 min extra
    return resetToken
}

const User  = mongoose.model("User",UserSchema)
module.exports = User