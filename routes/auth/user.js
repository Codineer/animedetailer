import { Router } from "express";
import { v4 as uuid } from "uuid";
import User from "../../models/user.models.js";
import bcrypt from 'bcrypt'
import { sendJsonError } from "../../services/errorJsonres.js";
import { getAndSetVerificationMailId, verifyVerificationMailId } from "../../services/VerificationMailId.js";
import { sendVerificationMail } from "../../services/sendVerificationMail.js";
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
            return sendJsonError(res, 'Invalid UserName')

        }
        const isCorrect = await bcrypt.compare(password.trim(), user.password);
        if (!isCorrect) {
            return sendJsonError(res, 'Invalid Password')

        }
        console.log("password correct")
        if (!user.isVerified) {

            const verification_token = await getAndSetVerificationMailId(user._id.toString())
            const result = await sendVerificationMail(user.email, verification_token)
            return sendJsonError(res, 'Not verfied check inbox please for verfication link')
        }
        const sessionId = uuid()
        const sessionExpiryDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
        const output = await user.updateOne(
            {
                sessionId,
                sessionExpiryDate
            })
        res.cookie('uid', sessionId, { httpOnly: true, expires: sessionExpiryDate })
        return res.json({ success: true, redirectUrl: "/" });
    } catch (e) {
        console.log(e)
        return sendJsonError(res, "something went wrong!")

    }
})
router.post('/register', async (req, res) => {
    try {


        const { name, email, password } = req.body;
        if (!(5 <= password.trim().length <= 15)) {
            return sendJsonError(res, "Password should be between 5 to 15 characters")

        }
        const hashedPassword = await bcrypt.hash(password.trim(), 10);



        const user = await User.create({
            name,
            email: email.trim().toLowerCase(),
            password: hashedPassword,

        })
        const userId = user._id.toString()
        const verification_token = await getAndSetVerificationMailId(userId)
        const result = await sendVerificationMail(user.email, verification_token)
        console.log(user, result)
        if (user) {
            // res.cookie('uid', sessionId, { httpOnly: true, expires: sessionExpiryDate })
            return res.json({ success: true, redirectUrl: `/auth/resend-email/${userId}` });
        }
        else {
            return sendJsonError(res, "Error making new user!")
        }
    }
    catch (e) {
        console.log(e)

        const errorMessage = e.message
        let message;
        if (errorMessage.includes('duplicate key error collection')) {
            message = "Email already registered!"
        }
        else if (errorMessage.includes('Please enter a valid email address')) {
            message = "Please enter a valid email address"
        }
        else if (errorMessage.includes('user validation failed')) {
            message = errorMessage
        }

        else {
            message = "something went wrong!"
        }
        console.log(message)
        return sendJsonError(res, message)

    }

})
router.get('/verify-email/:slug', async (req, res, next) => {
    const token = req.params.slug
    const result = await verifyVerificationMailId(token)
    console.log(result, "res")
    if (result == "verified") {
        return res.render('email-verification')
    }
    else if (result == 'already verified') {
        return res.status(200).redirect('/auth/login')
    }
    else if (result === 'jwt expired') {

        return res.status(200).send(` <html>
    <body>
      <script>
        alert('verification link expired. Redirecting to login...');
        window.location.href = '/auth/login';
      </script>
    </body>
  </html>`)

    }

})

export { router }