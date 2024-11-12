import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name is required'],
        minlength: [5, 'Name should of be minimum of 5 characters'],
        maxlength: [15, 'Name cannot be more than 15 characters']
    },
    email: {
        type: String,
        unique: [true, "unique email is required"],
        index: true,
        required: [true, 'email is required'],
        match: [
            /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, // Basic regex for email validation
            'Please enter a valid email address'
        ]
    },
    password: {
        type: String,
        required: [true, 'password is required'],

    },
    sessionId: {
        type: String,
        unique: [true, "unique sessionId is required"],
        index: true,
        required: [true, 'sessionId is required']
    },
    sessionExpiryDate: {
        type: Date,
        required: [true, 'session expiry date is required']
    },

    isVerified: {
        type: Boolean,
        default: false
    }

}, {
    timestamps: true
})

const sessionSchema = new Schema({

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