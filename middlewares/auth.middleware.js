import User from "../models/user.models.js"
export const authMiddleware = async (req, res, next) => {
    const path = req.originalUrl
    const isAuthPath = path.includes('/auth')
    const uuid = req.cookies.uid

    let user = "";

    user = await User.findOne({
        sessionId: uuid
    })

    // console.log(req.cookies)
    if (user && uuid) {
        console.log("user found")
        const currentDate = new Date()
        console.log(user.isVerified)
        if ((user.sessionExpiryDate > currentDate) && (user.isVerified == true)) {
            if (isAuthPath) {
                return res.redirect('/')

            }
            else {
                next()
                return

            }

        }
        else {
            res.cookie('uid', "", { httpOnly: true, expires: new Date(Date.now() + 2000) })
            if (!isAuthPath) {
                return res.redirect('/')
            }
        }
    } else {

        if (isAuthPath) {
            next()
            return
        }
        else {
            res.cookie('uid', "", { httpOnly: true, expires: new Date(Date.now() + 2000) })
            return res.redirect('/auth/login')

        }
    }
}