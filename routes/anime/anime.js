import { Router } from "express";
const router = Router()

router.get('/categories', async (req, res) => {

    let resp = await fetch(`https://kitsu.io/api/edge/categories`)
    let categories = await resp.json()
    res.render('anime/categories', { categories })

})
router.get('/:slug', async (req, res) => {

    let resp = await fetch(`https://kitsu.io/api/edge/anime/${req.params.slug}`)
    let animedata = await resp.json()

    let animecharacterslink = animedata.data.relationships.animeCharacters.links.related

    let animech = await fetch(animecharacterslink)
    animech = await animech.json()

    let animeCharacters = []

    for (const ch of animech.data) {
        try {
            let character = await fetch(ch.relationships.character.links.related)

            character = await character.json()
            animeCharacters.push(character)
        }
        catch (e) {
            console.log(e)
            continue
        }
    }


    res.render('anime/animepage', { animedata, animeCharacters })
})
router.get('/episodes/:slug', async (req, res) => {
    let resp = await fetch(`https://kitsu.io/api/edge/anime/${req.params.slug}/relationships/episodes`)
    let episodes = await resp.json()
    res.render('anime/episodes', { episodes, name: req.query.name })
})
router.get('/episodes/episode/:slug', async (req, res) => {

    let resp = await fetch(`https://kitsu.io/api/edge/episodes/${req.params.slug}`)
    let episode = await resp.json()

    res.render('anime/episode', { episode })
})
router.get('/character/:slug', async (req, res) => {

    let resp = await fetch(`https://kitsu.io/api/edge/characters/${req.params.slug}`)
    let character = await resp.json()

    res.render('anime/character', { character })
})
router.get('/genre/:slug', async (req, res) => {

    let resp = await fetch(`https://kitsu.io/api/edge/anime?filter[genres]=${req.params.slug}`)
    let animes = await resp.json()

    res.render('anime/genrepage', { animes, genreName: req.params.slug })
})

export default router