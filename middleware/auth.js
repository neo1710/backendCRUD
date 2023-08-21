const jwt=require('jsonwebtoken');
const mongoose=require('mongoose');
const BkModel = require('../models/bkModel');


const auth=async(req,res,next)=>{
    let token=req.headers.authorization.split(" ")[1];
    try {
        let check=await BkModel.findOne({token});
        if(check){
            res.status(400).send({msg:"login again"});
        }else{
            jwt.verify(token,'neo',(err,decoded)=>{
                if(decoded){
                    req.body.userId=decoded.userId;
                    req.body.userEmail=decoded.userEmail;
                    next();
                }else{
                    res.status(400).send({msg:"Invalid token"});  
                }
            })
        }
    } catch (error) {
        res.status(400).send({msg:'auth error'});
    }
}



module.exports=auth;
