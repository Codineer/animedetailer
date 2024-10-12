import express from 'express'
import path from 'path';
import { fileURLToPath } from 'url';
import router from './routes/anime/anime.js';
import KitsuApi from 'kitsu-json-api';


let kitsuApi = new KitsuApi();
const app = express()
app.set('views', './views');
app.set('view engine', 'ejs');
const port = 3000


app.use(express.static('public'))
app.use('/anime', router)

app.get('/', async (req, res) => {

    const data1 = await fetch('https://kitsu.io/api/edge/trending/anime')
    const data2 = await fetch('https://kitsu.io/api/edge/anime?sort=-userCount')
    const data3 = await fetch('https://kitsu.io/api/edge/anime?sort=-favoritesCount')
    const data4 = await fetch('https://kitsu.io/api/edge/genres')

    const TrendingAnimes = await data1.json()
    const PopularAnimes = await data2.json()
    const favoritesAnimes = await data3.json()
    const genres = await data4.json()
    res.render('index.ejs', { TrendingAnimes, PopularAnimes, favoritesAnimes, genres })
})

app.get('/search', async (req, res) => {
    // if (!req.query?.filter?.text) {
    //     res.render('not-found')
    //     return

    // }
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
    console.log(req.query['filter'])
    const genres = {
        data: [
            "Action",
            "Adventure",
            "Comedy",
            "Drama",
            "Sci-Fi",
            "Space",
            "Mystery",
            "Magic",
            "Supernatural",
            "Police"
        ]
    }
    let master = []
    for (const i in req.query.filter) {
        const key = i
        const value = req.query.filter[i]
        if (typeof (value) == 'string') {
            master.push({
                key: key,
                value: [value]
            })
        } else if (Array.isArray(value)) {
            master.push({ key: key, value: value })
        }
    }

    try {
        let resp = await kitsuApi
            .query('anime')
            .filter(master)
            .paginationLimit(5)
            .paginationOffset(0).execute();
        const SearchResults = JSON.parse(resp);
        res.render('search-results', { SearchResults, genres, searchQuery: req.query?.filter?.text ? req.query?.filter?.text : "" })

    } catch (e) {
        console.log(e.message)
        console.log(e)
        res.render('not-found')
    }



})

app.get('/filter', async (req, res) => {
    let genres = {
        data:
            [
                "Action",
                "Adventure",
                "Comedy",
                "Drama",
                "Sci-Fi",
                "Space",
                "Mystery",
                "Magic",
                "Supernatural",
                "Police"
            ]
    }

    res.render('advanced-search', { genres })
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