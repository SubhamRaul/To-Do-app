import mongoose, { Schema } from "mongoose";

const todoSchema = new mongoose.Schema({
    text:{
        type: String,
        required: true,
    },
    completed:{
        type: Boolean,
        default: false,
    }, 
    user:{
        type: Schema.Types.ObjectId,    
        ref: "User",
        required: true,
    }
},{timestamps: true});

const Todo = mongoose.model("Todo", todoSchema);
export default Todo;