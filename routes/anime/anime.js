import { Router } from "express";
import KitsuApi from 'kitsu-json-api';
let kitsuApi = new KitsuApi();
const router = Router()

router.get('/:slug', async (req, res) => {

    // res.send(req.params.slug)
    let resp = await fetch(`https://kitsu.io/api/edge/anime/${req.params.slug}`)
    resp = await resp.json()
    let episodeslink = resp.data.relationships.episodes.links.self
    let animecharacterslink = resp.data.relationships.animeCharacters.links.self

    let animech = await fetch(animecharacterslink)
    animech = await animech.json()

    let animeCharacters = []
    for (const ch of animech.data) {
        try {
            let character = await fetch(`https://kitsu.io/api/edge/characters/${ch.id}`)

            character = await character.json()
            console.log(character)
            animeCharacters.push(character)
        }
        catch (e) {
            console.log(e)
            continue
        }
    }
    console.log(animeCharacters)
    res.send("hello world")
})

export default router