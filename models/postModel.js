const mongoose=require('mongoose');

const postSchema=mongoose.Schema({
title:{type:String,required:true},
userId:{type:String,required:true},
userEmail:{type:String,required:true},
body: {type:String,required:true},
device: {type:String,required:true},
no_of_comments: {type:Number,required:true}
})

const PostModel=mongoose.model('posts',postSchema);

module.exports=PostModel;