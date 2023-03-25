const express=require("express");
const mongoose=require("mongoose");
const User=require("./models/userLogin");
const conn=require("./connection/connec");
const registerRoute=require("./routes/register");
const loginRoute=require("./routes/login");
const userRoute=require("./routes/userRoute");
const jwt=require("jsonwebtoken");
conn();

const app=express();

app.use("/user",(req,res,next)=>{
    let token=req.headers.authorization;
    if(token){
        jwt.verify(token,"secret",function(err,decoded){
            if(err){
                return res.status(403).json({
                    message:"token is not valid",
                })
            }
            next();
        })
    }else{
        return res.status(403).json({
            message:"Your are not authenticated"
        })
    }
})

app.use("/",registerRoute);
app.use("/",loginRoute);
app.use("/",userRoute);

app.listen(5050,()=>{
    console.log("server is running......")
})