import express from "express"
import multer from "multer"
import { upload, getSongs, getSongById } from "../controller/song.controller.js"


const router = express.Router()

const storage = multer.memoryStorage()

const uploadmiddlewere = multer({
    storage : storage
})


router.post("/upload",uploadmiddlewere.fields([{ name: "file", maxCount: 1 },{ name: "albumCover", maxCount: 1 }]),upload)

router.get("/getAllSong",getSongs)
router.get("/getSongById/:songId",getSongById)
export default router