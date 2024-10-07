
const episodeIds = []
// Store already fetched episode IDs to avoid repeated requests

async function retreivedata(episodeHeading, episodeId) {

    const parent = episodeHeading.parentElement
    let episodeDesc = parent.childNodes[5]
    // Find the closest parent episode div and then the corresponding .episode-description inside it

    if (episodeDesc.style.display === 'none' || episodeDesc.style.display === '') {
        // if (episodeDesc.innerText.trim() == "") {
        //     episodeDesc.innerText = 'loading...'
        // }
        episodeDesc.style.display = 'flex';

    } else {
        episodeDesc.style.display = 'none';
    }

    // let data = null;

    // // Fetch the episode data only if it hasn't been fetched already
    // if (!episodeIds.includes(episodeId)) {
    //     episodeIds.push(episodeId);

    //     try {

    //         data = await fetch(`https://kitsu.io/api/edge/episodes/${episodeId}`);

    //         data = await data.json();
    //         if (data && data.data && data.data.attributes && data.data.attributes.synopsis) {
    //             episodeDesc.innerText = data.data.attributes.synopsis || "No description available.";
    //         } else {
    //             episodeDesc.innerText = "No description available.";
    //         }
    //     } catch (error) {
    //         console.error("Error fetching data from Kitsu API:", error);
    //     }
    // } else {
    //     console.log(`Episode ID ${episodeId} data already fetched.`);
    // }

    // // Toggle the display of the corresponding .episode-description


    // return data;
}

