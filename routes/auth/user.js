import { Router } from "express";
const router = Router()
router.get('/login', async (req, res) => {
    res.render('sign-In.ejs')

})
router.get('/register', async (req, res) => {


    res.render('sign-Up.ejs')
})
router.post('/login', async (req, res) => {
    const { email, password } = req.body

})
router.post('/register', async (req, res) => {

    const { name, email, password } = req.body
    console.log(name, email, password)
})
export { router }