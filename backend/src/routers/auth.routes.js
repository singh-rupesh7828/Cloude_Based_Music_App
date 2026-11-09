import express from "express"
import {Registeruser,loginUser,fetchMe} from "../controller/auth.controller.js"
const router = express.Router()

router.post("/register", Registeruser)
router.post("/signin", loginUser)
router.get("/fetchme", fetchMe)

export default router