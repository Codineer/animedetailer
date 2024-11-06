import { Router } from "express";
import { v4 as uuid } from "uuid";
import User from "../../models/user.models.js";
const router = Router()
router.get('/login', async (req, res) => {
    res.render('sign-In.ejs')

})
router.get('/register', async (req, res) => {


    res.render('sign-Up.ejs')
})
router.post('/login', async (req, res) => {
    const { email, password } = req.body
    console.log(email, password)
    const user = await User.findOne({
        email,
        password
    });
    if (!user) {
        return res.json({
            success: false,
            message: 'Invalid Username or Password'
        });
    }
    const sessionId = uuid()
    const sessionExpiryDate = new Date();
    sessionExpiryDate.setDate(sessionExpiryDate.getDate() + 1);
    const output = await user.updateOne(
        {
            sessionId,
            sessionExpiryDate
        })
    res.cookie('uid', sessionId, { httpOnly: true })
    return res.json({ success: true, redirectUrl: "/" });
})
router.post('/register', async (req, res) => {

    const { name, email, password } = req.body
    console.log(name, email, password)

})
export { router }