const express=require('express');
const cors=require('cors');
const router=express();
// const userDetails=require("../models/userLogin");
const notesData=require("../models/notesModel");

router.use(express.json());
router.use(cors());

router.post("/createNotes",async(req,res)=>{
    try{
        const {title,description}=req.body;
        await notesData.create(req.body);
        // const data=await notesData.create(req.body);
        res.status(201).json({
            message:"Data Submission Done"
        })
    }catch(e){
        res.status(400).send({
            message:"All fields are mandatory"
        })
    }
})

router.get("/getNotes",async(req,res)=>{
    try{
        const data=await notesData.find();
        res.status(201).json({
            message:"Success",
            data
        })
    }catch(e){
        res.json({
            status:"failed",
            message:e.message
        })
    }
})

router.get("/getNotes/:id",async(req,res)=>{
    try{
        notesData.find({_id:req.params.id}).then((data)=>{
            res.send({data});
        })
    }catch(e){
        res.send(e)
    }
})

router.put("/update/:id",async(req,res)=>{
    try{
        await notesData.updateOne({_id:req.params.id},req.body);
        res.status(201).json({
            message:"Success"
        })
    }catch(e){
        res.json({
            status:"failed",
            message:e.message
        })
    }
})

router.delete("/deleteAll",async(req,res)=>{
    try{
        const data=await notesData.deleteMany({});
        res.status(201).json({
            message:"Delted",
            data
        })
    }catch(e){
        res.json({
            status:"failed",
            message:e.message
        })
    }
})

router.delete("/delete/:id",async(req,res)=>{
    try{
        const data=await notesData.findByIdAndDelete(req.params.id);
        res.send(data);
    }catch(e){
        res.send(e);
    }
})

module.exports=router;