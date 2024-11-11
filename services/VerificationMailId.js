import jwt from "jsonwebtoken";
import User from "../models/user.models.js";
export const getAndSetVerificationMailId = async (id, user) => {
    const token = jwt.sign({ userId: id }, process.env.MAIL_JWT_SECRET_KEY, { expiresIn: '1h' });
    const output = await user.updateOne({
        verifyId: token,
        verifyIdExpiryDate: new Date(Date.now() + 60 * 60)
    })

    return token
}