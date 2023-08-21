const mongoose=require('mongoose');

const bkSchema=mongoose.Schema({
token:{type:String,required:true},
})

const BkModel=mongoose.model('bk',bkSchema);

module.exports=BkModel;