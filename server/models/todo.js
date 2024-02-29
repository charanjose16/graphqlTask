import mongoose from "mongoose";
const Schema=mongoose.Schema;
const todoSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    image:{
       type :String,
    },
    price:{
        type:Number,
        required:true
    },
    discount:{
    type:Number}
},{timestamps:true})

const todo=mongoose.model("todo",todoSchema);
export default todo;