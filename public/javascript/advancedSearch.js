let dateDropdown = document.getElementById('date-dropdown');
const inputText = document.querySelector('.search-box-advanced')
let currentYear = new Date().getFullYear();
let earliestYear = 1970;
let dateOption = document.createElement('option');
dateOption.text = null;
dateOption.value = null;
dateDropdown.add(dateOption);
while (currentYear >= earliestYear) {
    let dateOption = document.createElement('option');
    dateOption.text = currentYear;
    dateOption.value = currentYear;
    dateDropdown.add(dateOption);
    currentYear -= 1;
}


let filterOptions = {
    season: null,
    ageRating: null,
    genre: null,
    year: null
}

function selectSeason(season) {
    if (filterOptions.season) {
        filterOptions.season.style.color = 'white'
        filterOptions.season.style.backgroundColor = 'transparent'
    }
    season.style.backgroundColor = 'white'
    season.style.color = '#ff2c1f'
    filterOptions.season = season
}
function selectAgeRating(ageRating) {
    if (filterOptions.ageRating) {
        filterOptions.ageRating.style.color = 'white'
        filterOptions.ageRating.style.backgroundColor = 'transparent'
    }
    ageRating.style.backgroundColor = 'white'
    ageRating.style.color = '#ff2c1f'
    filterOptions.ageRating = ageRating
}
function selectGenre(genre) {
    if (filterOptions.genre) {
        filterOptions.genre.style.color = 'white'
        filterOptions.genre.style.backgroundColor = 'transparent'
    }
    genre.style.backgroundColor = 'white'
    genre.style.color = '#ff2c1f'
    filterOptions.genre = genre
}
function searchAdvanced() {


    console.log(inputText.value)
    let query = ""
    if (filterOptions.season?.innerText) {
        query = query + "&filter[season]=" + filterOptions?.season?.innerText
    }
    if (filterOptions.ageRating?.innerText) {
        query = query + "&filter[ageRating]=" + filterOptions?.ageRating?.innerText
    }
    if (filterOptions.ageRating?.innerText) {
        query = query + "&filter[ageRating]=" + filterOptions?.ageRating?.innerText
    }
    if (filterOptions?.genre?.innerText) {
        query = query + "&filter[genres]=" + filterOptions?.genre?.innerText
    }
    if (dateDropdown.value != "null") {
        query = query + "&filter[seasonYear]=" + dateDropdown.value
    }

    console.log()
    window.location.href = `/search?filter[text]=${inputText.value}${query}`;

}
