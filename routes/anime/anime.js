import { Router } from "express";
import KitsuApi from 'kitsu-json-api';
let kitsuApi = new KitsuApi();
const router = Router()

router.get('/:slug', async (req, res) => {


    let resp = await fetch(`https://kitsu.io/api/edge/anime/${req.params.slug}`)
    let animedata = await resp.json()

    let animecharacterslink = animedata.data.relationships.animeCharacters.links.related

    let animech = await fetch(animecharacterslink)
    animech = await animech.json()

    let animeCharacters = []
    console.log(animedata)
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

export default router