import mongoose from "mongoose";


const connectDB=()=>{
    mongoose.connect("mongodb://localhost:27017/aajkitajakhabar")
.then(()=>{
    console.log("mongoDB is Connected");
    
})
.catch((e)=>{
    console.log("Failed to connect MongoDB",e);
    
})
}

export default connectDB