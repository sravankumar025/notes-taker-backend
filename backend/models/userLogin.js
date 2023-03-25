const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const userSchema=new mongoose.Schema({
    email:{type:String,required:true},
    password:{type:String,required:true},
    confirmPassword:{type:String,required:true}
})

const User=mongoose.model('user',userSchema);
module.exports=User;