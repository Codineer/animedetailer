import express from 'express'
import path from 'path';
import { fileURLToPath } from 'url';
import router from './routes/anime/anime.js';
import KitsuApi from 'kitsu-json-api';

// Pagination is supported via limit and offset
let kitsuApi = new KitsuApi();
const app = express()
app.set('view engine', 'ejs');
const port = 3000
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static('public'))
app.use('/anime', router)

app.get('/', async (req, res) => {
    console.log('hii anshu')
    const data1 = await fetch('https://kitsu.io/api/edge/trending/anime')
    const data2 = await fetch('https://kitsu.io/api/edge/anime?sort=-userCount')
    const data3 = await fetch('https://kitsu.io/api/edge/anime?sort=-favoritesCount')
    const data4 = await fetch('https://kitsu.io/api/edge/genres')

    const TrendingAnimes = await data1.json()
    const PopularAnimes = await data2.json()
    const favoritesAnimes = await data3.json()
    const genres = await data4.json()
    res.render('index', { TrendingAnimes, PopularAnimes, favoritesAnimes, genres })
})

app.get('/search', async (req, res) => {
    if (!req.query.keyword) {
        res.render('not-found')
        return

    }
    //make a function of this
    // let resp = await kitsuApi
    //     .query('anime') // anime category
    //     .filter([
    //         //use for loop here 
    //         {
    //             key: 'season',
    //             value: ['winter', 'spring'] // filter by winter and spring
    //         },
    //         {
    //             key: 'seasonYear',  // filter by year 2017
    //             value: ['2017']
    //         }
    //     ])
    //     .paginationLimit(5) // set limit
    //     .paginationOffset(0).execute();


    let resp = await kitsuApi
        .query('anime')
        .filter([
            {
                key: 'text',
                value: [req.query.keyword,]
            },

        ])
        .paginationLimit(5)
        .paginationOffset(0).execute();
    const SearchResults = JSON.parse(resp);

    res.render('search-results', { SearchResults })
})

app.get('/index', (req, res) => {

    console.log(req.query)
    res.send('ss')
})

app.get('/blog/:slug', (req, res) => {
    console.log(req)
    res.send(`hello ${req.params.slug}`)
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})