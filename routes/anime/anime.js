import { Router } from "express";
const router = Router()

router.get('/:slug', (req, res) => {
    res.send(req.params.slug)
})

export default router