const express=require("express");
const User=require("../models/userLogin");
const bodyParser=require('body-parser');
const jwt=require('jsonwebtoken');
const router=express.Router();

router.use(bodyParser.urlencoded({extended:false}));

router.use(bodyParser.json());

router.post("/login", async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await User.findOne({email:email});
        if(!user){
            res.json({
                status:"failed",
                message:"Email doesnot exists kindly register",
            })
        }else{
            const token=jwt.sign({exp:Math.floor(Date.now()/1000)+(6000000*60),user:user._id},'secret');
            if(password==user.password){
                res.status(200).json({
                    status:'success',
                    message:"Welcome authentication successfull, you are logged in",
                    jwt_token:token
                })
            }else{
                res.status(500).json({
                    status:"fail",
                    message:"Password is incorrect"
                })
            }
        }
    }catch(e){
        res.status(404).json({
            status:"",
            message:"kindly fill all the details"
        })
    }
})

module.exports=router;