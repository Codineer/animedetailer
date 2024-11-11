import express from 'express'
import router from './routes/anime/anime.js';
import { router as authRouter } from './routes/auth/user.js';
import KitsuApi from 'kitsu-json-api';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import { authMiddleware } from './middlewares/auth.middleware.js';
import { sendJsonError } from './services/errorJsonres.js';

const domain = 'https://animedetailer.onrender.com/';
dotenv.config();
const uri = process.env.MONGO_URI;
async function connectDB() {
    try {
        await mongoose.connect(uri);
        console.log('Connected to MongoDB Atlas');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}
connectDB();

let kitsuApi = new KitsuApi();
const app = express()
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.set('views', './views');
app.set('view engine', 'ejs');
const port = 3000


app.use(express.static('public'))
app.use(cookieParser())
app.use(express.json());
app.use(authMiddleware)
app.use('/anime', router)
app.use('/auth', authRouter)

app.get('/', async (req, res) => {
    const data1 = await fetch('https://kitsu.io/api/edge/trending/anime')
    const data2 = await fetch('https://kitsu.io/api/edge/anime?sort=-userCount')
    const data3 = await fetch('https://kitsu.io/api/edge/anime?sort=-favoritesCount')
    const data4 = await fetch('https://kitsu.io/api/edge/genres')
    const TrendingAnimes = await data1.json()
    const PopularAnimes = await data2.json()
    const favoritesAnimes = await data3.json()
    const genres = await data4.json()
    res.render('index.ejs', { TrendingAnimes, PopularAnimes, favoritesAnimes, genres, domain })
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
            .paginationLimit(10)
            .paginationOffset(0).execute();
        const SearchResults = JSON.parse(resp);
        res.render('search-results', { SearchResults, genres, searchQuery: req.query?.filter?.text ? req.query?.filter?.text : "", domain })

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

    res.render('advanced-search', { genres, domain })
})

app.post('/logout', async (req, res, next) => {
    try {
        res.cookie("uid", "", { httpOnly: true, expires: new Date(Date.now() + 2000) })
        res.status(200)
        return res.json({ success: true })

    } catch (e) {
        console.log(e)
        return sendJsonError(res, "something went wrong!")
    }
})
app.get('/verify-email/:slug', async (req, res, next) => {
    return res.render('email-verification')
})
app.get('/get-verification-id/:id', async (req, res, next) => {

})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})