import mongoose from "mongoose";

const Userschema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        select: false
    },
    token:{
        type:String,
    }
} , {timestamps: true});

const User = mongoose.model("User", Userschema);

export default User;