export const sendJsonError = (res, message) => {
    res.status(404)
    return res.json({ success: false, message })
}