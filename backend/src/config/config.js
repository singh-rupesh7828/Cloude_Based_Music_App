import dotenv from "dotenv"

dotenv.config()

const config = {
    jwtSecret: process.env.JWT_SECRET_KEY,
    imageKitPrivateKey:process.env.IMAGEKIT_PRIVATE_KEY,
    imageKitPublicKey:process.env.IMAGEKIT_PUBLIC_KEY,
    imageKitEndPointURL:process.env.IMAGEKIT_URL_ENDPOINT,

}

export default config