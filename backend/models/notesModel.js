const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const notesSchema=new mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
},{
    timestamps:true
})

const Note=mongoose.model('note',notesSchema);
module.exports=Note;