import { Router } from "express";
import { v4 as uuid } from "uuid";
import User from "../../models/user.models.js";
import bcrypt from 'bcrypt'
const router = Router()
router.get('/login', async (req, res) => {
    res.render('sign-In.ejs')

})
router.get('/register', async (req, res) => {


    res.render('sign-Up.ejs')
})
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({
            email: email.trim().toLowerCase()
        });

        if (!user) {
            console.log("user not found")
            res.status(404)
            return res.json({
                success: false,
                message: 'Invalid Username'
            });
        }
        const isCorrect = await bcrypt.compare(password, user.password);
        if (!isCorrect) {
            res.status(404)
            return res.json({
                success: false,
                message: 'Invalid Password'
            });
        }
        console.log("password correct")
        const sessionId = uuid()
        const sessionExpiryDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
        const output = await user.updateOne(
            {
                sessionId,
                sessionExpiryDate
            })
        res.cookie('uid', sessionId, { httpOnly: true, expires: sessionExpiryDate })
        return res.json({ success: true, redirectUrl: "/" });
    } catch (error) {
        console.log(error.message)
        res.status(404)
        return req.json({ success: false, message: "something went wrong" })
    }
})
router.post('/register', async (req, res) => {
    try {


        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const sessionId = uuid()
        const sessionExpiryDate = new Date(Date.now() + 24 * 60 * 60 * 1000);

        const user = await User.create({
            name,
            email: email.trim().toLowerCase(),
            password: hashedPassword,
            sessionId,
            sessionExpiryDate
        })
        if (user) {
            res.cookie('uid', sessionId, { httpOnly: true, expires: sessionExpiryDate })
            return res.json({ success: true, redirectUrl: "/" });
        }
        else {
            res.status(404)
            return res.json({ success: false, message: "Error making new user!" })
        }
    }
    catch (e) {
        const errorMessage = e.message
        let message;
        if (errorMessage.includes('duplicate key error collection')) {
            message = "Email already registered!"
        }
        else {
            message = "something went wrong!"
        }
        console.log(message)
        res.status(404)
        return res.json({
            success: false,
            message
        })
    }

})
export { router }