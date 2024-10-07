let episodedropdown = document.querySelector('.episode-dropdown');
let episodedesc = document.querySelector('.episode-description')
episodedropdown.addEventListener("click", () => {

    if (episodedesc.style.display === 'none' || episodedesc.style.display === '') {
        episodedesc.style.display = 'block';
    }
    else {
        episodedesc.style.display = 'none';
    }
})