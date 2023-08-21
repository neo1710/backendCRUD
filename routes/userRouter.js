const {Router}=require('express');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const UserModel = require('../models/userModel');

const userRouter=Router();


userRouter.post('/register',async(req,res)=>{
let {email,password,name,city,age,gender,is_married}=req.body;
try {
    let user=await UserModel.findOne({email});
    if(user){
        res.status(400).send({msg:"User already exist, please login"})
    }else{
        bcrypt.hash(password,5,async(err,hashed)=>{
            if(hashed){
                let newUser=new UserModel({email,city,age,gender,is_married,name,password:hashed});
                await newUser.save();
                res.status(200).send({msg:"User added"})
            }else{
                res.status(400).send({msg:err})
            }
        })
    }
} catch (error) {
     res.status(400).send({msg:error})
}

})


userRouter.post('/login',async(req,res)=>{
let {email,password}=req.body;
    try {
        let user=await UserModel.findOne({email});
        if(user){
            bcrypt.compare(password,user.password,(err,same)=>{
                if(same){
                    let token=jwt.sign({userEmail:email,userId:user._id},'neo',{expiresIn:'7d'})
                    res.send({msg:"user logged in",token})
                }else{
                    res.status(400).send({msg:"wrong password"});
                }
            })
        }else{
            res.status(400).send({msg:"wrong credentials"});
        }
    } catch (error) {
        res.status(400).send({msg:error});
    }
})


module.exports=userRouter;