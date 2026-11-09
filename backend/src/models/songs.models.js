import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
    songfile:{
        type : String,
        required : true
    },
    
    title:{
        type : String,
        required : true
    },
    artist:{
        type : String,
        required : true
    },
    cover:{
        type : String,
        default:"https://th.bing.com/th/id/R.3eb76a6e243e40d931885308e164cbad?rik=%2bUkTD6ETDaDlhg&riu=http%3a%2f%2fkingdomofheavenmusic.com%2fassets%2fimages%2fdefault-song.png&ehk=O2wkHZmS1rrTNYlrNcmbv%2fXsMCElGciqM3zFDYGX15s%3d&risl=&pid=ImgRaw&r=0"
    },
})


const songmodel = mongoose.model("song", songSchema)

export default songmodel