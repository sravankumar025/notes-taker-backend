const express=require("express");
const User=require("../models/userLogin");
const bodyParser=require('body-parser');
const cors=require('cors');
const router=express.Router();

router.use(bodyParser.urlencoded({extended:false}));

router.use(bodyParser.json());

router.use(cors());

router.post("/register",async(req,res)=>{
    try{
        const {email,password,confirmPassword}=req.body;
        if(email && password && confirmPassword){
            if(password==confirmPassword){
                const data=await User.findOne({email:email,password:password,confirmPassword:confirmPassword});
                if(data!=null){
                    res.status(500).json({
                        status:"failed",
                        message:"email already exsits kindly login"
                    })
                }else{
                    await User.create({email,password,confirmPassword});
                    res.status(200).json({
                        status:"success",
                        message:"Registration Done"
                    })
                }
            }else{
                res.json({
                    status:"failed",
                    message:"Password and confirmPasssword are not matching"
                })
            }
        }else{
            return res.status(400).json({
                status:"Failed to register",
                message:"All fields are mandatory"
            })
        }
    }catch(e){
        if(e.code==11000){
            return res.status(400).json({
                status:"failed",
                message:"Email already exists"
            })
        }
        return res.status(500).send(e);
    }
})

module.exports=router;