import express from 'express'
import path from 'path';
import { fileURLToPath } from 'url';
import router from './routes/anime/anime.js';

const app = express()
app.set('view engine', 'ejs');
const port = 3000
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static('public'))
app.use('/anime', router)

app.get('/', async (req, res) => {
    const data1 = await fetch('https://kitsu.io/api/edge/trending/anime')
    const data2 = await fetch('https://kitsu.io/api/edge/anime?sort=-userCount')
    const data3 = await fetch('https://kitsu.io/api/edge/anime?sort=-favoritesCount')

    const TrendingAnimes = await data1.json()
    const PopularAnimes = await data2.json()
    const favoritesAnimes = await data3.json()
    res.render('index', { TrendingAnimes, PopularAnimes, favoritesAnimes })
})
app.get('/index', (req, res) => {
    res.send('ss')
})

app.get('/blog/:slug', (req, res) => {
    console.log(req)
    res.send(`hello ${req.params.slug}`)
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})