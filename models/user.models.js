import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name is required']
    },
    email: {
        type: String,
        required: [true, 'email is required']
    },
    sessionId: {
        type: String,
        required: [true, ' email is required']
    },
    sessionExpiryDate: {
        type: Date,
        required: [true, 'expiry date is required']
    },
    password: {
        type: String,
        required: [true, 'password is required']
    }

}, {
    timestamps: true
})

const User = mongoose.model('user', userSchema)
export default User