const {Router}=require('express');
const PostModel = require('../models/postModel');
const auth = require('../middleware/auth');

const postRouter=Router();
postRouter.use(auth)
postRouter.post('/add',async(req,res)=>{
    let post=req.body;
    try {
    let newPost=new PostModel(post);
    await newPost.save();
    console.log(post);
    res.status(200).send({msg:"Post added!"})
    } catch (error) {
       res.status(400).send({msg:error}) 
    }
})


postRouter.get('/',async(req,res)=>{
    let {userId}=req.body;
    try {
     let posts=await PostModel.find({userId}).limit(3);
    res.status(200).send({posts})
    } catch (error) {
       res.status(400).send({msg:error}) 
    }
})

postRouter.patch('/update/:id',async(req,res)=>{
    let {id}=req.params;
    try {
  await PostModel.findByIdAndUpdate({_id:id},req.body);
    res.status(200).send({msg:"Post updated!"})
    } catch (error) {
       res.status(400).send({msg:error}) 
    }
})

postRouter.delete('/delete/:id',async(req,res)=>{
    let {id}=req.params;
    try {
  await PostModel.findByIdAndDelete({_id:id},req.body);
    res.status(200).send({msg:"Post deleted!"})
    } catch (error) {
       res.status(400).send({msg:error}) 
    }
})

module.exports=postRouter;