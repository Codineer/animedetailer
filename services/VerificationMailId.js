import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User from "../models/user.models.js";
export const getAndSetVerificationMailId = async (id, user) => {
    const token = jwt.sign({ userId: id, email: user.email }, process.env.MAIL_JWT_SECRET_KEY, { expiresIn: '1h' });


    return token
}
export const verifyVerificationMailId = async (token) => {

    const decoded = jwt.verify(token, process.env.MAIL_JWT_SECRET_KEY)
    const email = decoded.email;
    const user = await User.findById(new mongoose.Types.ObjectId(decoded.userId))
    const output = await user.updateOne({
        isVerified: true
    })
    console.log(output)
    console.log(user)
    return (true, user)

}