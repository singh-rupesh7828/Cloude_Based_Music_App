import songmodel from "../models/songs.models.js";
import { uploadFile } from "../services/storage.services.js";


export const upload = async(req, res)=>{
    const audioFile = req.files?.file?.[0]

    if (!audioFile) {
       return res.status(400).json({
            message : "audio file required"
        })
    }

    const {title, artist}= req.body

    if (!title || !artist) {
        return res.status(400).json({
            message: "title and artist are required"
        })
    }

    const audioResult = await uploadFile(
        audioFile.buffer,
        audioFile.originalname,
        "/audio-files/"
    )
    const coverFile = req.files?.albumCover?.[0]
    const coverResult = coverFile
        ? await uploadFile(coverFile.buffer, coverFile.originalname, "/song-covers/")
        : null

    const song = await songmodel.create({
        artist,
        title,
        songfile: audioResult.url,
        ...(coverResult && { cover: coverResult.url })
    })

    return res.status(201).json({
        message : "song created succesfully",
        song
    })
}   

export const getSongs = async(req, res)=>{
    const song = await songmodel.find()

    return res.status(200).json({
        message :"all songs fetched",
        songs: song
    })
}

export const getSongById = async(req, res)=>{
    const {songId} = req.params

    const song = await songmodel.findById(songId)

    if (!song) {
        return res.status(404).json({
            message: "Song not found"
        })
    }

    return res.status(200).json({
        message : "song fetched by id",
        song : song
    })
}

