import Imagekit, { toFile } from "@imagekit/nodejs"
import config from "../config/config.js"

const imagekit = new Imagekit({
    privatekey : config.imageKitPrivateKey
})


export async function uploadFile(file, fileName, folder) {
    const result = await imagekit.files.upload({
        file: await toFile(file, fileName),
        fileName: `${Date.now()}-${fileName}`,
        folder
    });

    return result;
}

