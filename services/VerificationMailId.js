import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User from "../models/user.models.js";
export const getAndSetVerificationMailId = async (id) => {
    const token = jwt.sign({ userId: id }, process.env.MAIL_JWT_SECRET_KEY, { expiresIn: '1h' });


    return token
}
export const verifyVerificationMailId = async (token) => {
    try {
        const decoded = jwt.verify(token, process.env.MAIL_JWT_SECRET_KEY)
        const user = await User.findById(new mongoose.Types.ObjectId(decoded.userId))
        if (user.isVerified === true) {
            return "already verified"
        }
        const output = await user.updateOne({
            isVerified: true
        })
        console.log(output)
        console.log(user)
        return "verified"
    }
    catch (e) {
        console.log(e.message)
        if (e.message.includes("jwt expired")) {
            console.log("yes")
            return "jwt expired"
        }
    }

}