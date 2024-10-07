try {
    var swiper = new Swiper(".home", {
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },

    });

} catch {
    console.log()
}

let header = document.querySelector('nav');
let menu = document.querySelector('#menu-icon');
let search = document.querySelector('#search-icon');
let navbar = document.querySelector('.navbar');
let searchform = document.querySelector('.search-form');
let navbarItems = document.querySelectorAll('.navitem');


menu.addEventListener("click", () => {
    console.log('Menu icon clicked');


    if (navbar.style.display === 'none' || navbar.style.display === '') {
        navbar.style.display = 'block';
        navbar.classList.add("mystylenav");// Show the navbar
        for (const navbarItem of navbarItems) {
            console.log(navbarItem)
            navbarItem.classList.add("media-ul");

        }
        console.log('Navbar shown');
    } else {
        navbar.style.display = 'none';  // Hide the navbar
        console.log('Navbar hidden');
    }
});
search.addEventListener("click", () => {
    console.log('Menu icon clicked');


    if (searchform.style.display === 'none' || searchform.style.display === '') {
        searchform.style.display = 'block';
        searchform.classList.add("mystylesearch");// Show the navbar

        // console.log('Navbar shown');
    } else {
        searchform.style.display = 'none';  // Hide the navbar

    }
});
