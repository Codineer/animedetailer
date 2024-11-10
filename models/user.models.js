import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name is required']
    },
    email: {
        type: String,
        unique: [true, "unique email is required"],
        index: true,
        required: [true, 'email is required']
    },
    password: {
        type: String,
        required: [true, 'password is required']
    },
    sessionId: {
        type: String,
        unique: [true, "unique sessionId is required"],
        index: true,
        required: [true, 'sessionId is required']
    },
    sessionExpiryDate: {
        type: Date,
        required: [true, 'expiry date is required']
    }

}, {
    timestamps: true
})

const User = mongoose.model('user', userSchema)
export default User