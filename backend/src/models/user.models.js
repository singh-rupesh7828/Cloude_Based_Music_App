import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type : String,
        required : true,
    },
    password:{
        type:String,
        required: true
    },
    gmail:{
        type : String,
        required :true,
        unique : true
    }
})


const usermodel = mongoose.model("user",userSchema)

export default usermodel