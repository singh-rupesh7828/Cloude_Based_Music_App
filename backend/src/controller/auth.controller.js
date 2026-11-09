import usermodel from "../models/user.models.js";
import bcrypt from "bcrypt"
import config from "../config/config.js"
import jwt from "jsonwebtoken"



export const Registeruser = async(req, res)=>{
    const {username, password, gmail} = req.body

    const isUserExist = await usermodel.findOne({gmail})

    if(isUserExist){
        return res.status(400).json({
            message: "User already exists"
        })
    }

    const hashPassword = await bcrypt.hash(password,10)

    const user = await usermodel.create({username,password: hashPassword,gmail})

    

    const token = jwt.sign(
        {id : user._id},
        config.jwtSecret,
        {expiresIn : "7d"}
    )

    res.cookie("token", token)
    
    res.status(201).json({
        message: "user created succesfully",
        user:{
            id : user._id,
            username: user.username
        },token
    })
}

export const loginUser = async(req, res)=>{
    const {gmail,password} = req.body

    const isUserExist = await usermodel.findOne({gmail})

    if (!isUserExist) {
        return res.status(400).json({
            message: "Invalid gmail or password"
        })
    }

    const isPasswordCorrect = await bcrypt.compare(password,isUserExist.password)

    if(!isPasswordCorrect){
        return res.status(400).json({
            message:"invalid username or password"
        })
    }

    const token = jwt.sign(
        {id: isUserExist._id},
        config.jwtSecret,
        {expiresIn:"1d"})

        res.cookie("token",token)

        res.status(200).json({
            message : "Login successful",
            user:{
                id : isUserExist._id,
                username : isUserExist.username
            },token
        })
}


export const fetchMe = async(req, res)=>{
    const token = req.cookies.token

    if (!token) {
        res.status(401).json({
            message : "unauthorised request"
        })
    }

    try {
        const decoded = jwt.verify(
        token,
        config.jwtSecret
    )

    res.status(200).json({
        message : "user fetched succesfully",
        user : {
            id : decoded.id
        }
    })
    } catch (error) {
        res.status(401).json({
            message : "unauthorised request detected"
        })
    }

    
}