const mongoose = require('mongoose');
 
 
const Schema = mongoose.Schema;
 
const PostSchema = new Schema({
    title : {type:String, trim:true},
    content : {type:String, trim:true},
 
    postedBy : {type : Schema.Types.ObjectId, ref :'User'},
 
    status : {type : Boolean, default : true},
}, {timestamps : true})
 
var Post = mongoose.model('Post',PostSchema);
module.exports = Post;