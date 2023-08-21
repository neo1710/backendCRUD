const express=require("express");
const connection = require("./db");
const BkModel = require("./models/bkModel");
const userRouter = require("./routes/userRouter");
const postRouter = require("./routes/postRoutes");
require('dotenv').config();
const cors=require('cors');
const app=express();
app.use(cors());
app.use(express.json());
app.use("/users",userRouter); 
app.use('/posts',postRouter); 


app.get('/',(req,res)=>{
   res.send({msg:"homepage"}); 
})

app.get('/logout',async(req,res)=>{
let token=req.headers.authorization.split(" ")[1];
    try {
        let check=await BkModel.findOne({token});
        if(check){
            res.status(400).send({msg:'already logged out. Login first'});
        }else{
            let bk=await BkModel({token});
            await bk.save();
            res.status(200).send({msg:"user logged out"});
        }
    } catch (error) {
        res.status(400).send({msg:error});
    }
})

app.listen(process.env.PORT,async()=>{
    try {
        await connection;
        console.log('connected');
        console.log('running 8080')
    } catch (error) {
        console.log(error)
    }
})