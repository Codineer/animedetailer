import express from 'express'
import path from 'path';
import { fileURLToPath } from 'url';

const app = express()
const port = 3000
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static('public'))
app.get('/', (req, res) => {

    res.send('Hello World!')
})

app.post('/', (req, res) => {
    res.send('Hello World')
})
app.get('/index', (req, res) => {
    res.sendFile('templates/index.html', { root: __dirname })
})

app.get('/blog/:slug', (req, res) => {
    console.log(req)
    res.send(`hello ${req.params.slug}`)
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})