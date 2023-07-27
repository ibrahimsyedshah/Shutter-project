let result;

const searchbar = document.getElementById("search");
const movieContainer = document.querySelector(".movies__container");

function loadMovie() {
    try {
        //clear innerHTML before each load    
        movieContainer.innerHTML = `<i class="fas fa-spinner loading-spinner"></i>`

        for(let i = 0; i < 6; ++i) {
            if(result.Search[i] == null) {
                break;
            }
             movieContainer.innerHTML += 
                `<div class="movie">
                    <figure class="poster__wrapper">
                        <img class="poster" src="${result.Search[i].Poster}" alt="">
                    </figure>
                    <h5>${result.Search[i].Title}</h5>
                    <h6>${result.Search[i].Year}</h6>
                </div>`
        }
    } catch {
        console.log("Error loading movie info");
    }
}

async function renderMovies(prompt) {
    movieContainer.classList += " loading";
    const promise = await fetch(`https://omdbapi.com/?apikey=757543e2&s=${prompt}`);
    result = await promise.json();
    movieContainer.classList.remove("loading");
    loadMovie();
}

function search() {
    if (document.getElementById("search-results__heading").classList !== "") {
        document.getElementById("search-results__heading").classList.remove("search-results__heading--visibility");
    }
    renderMovies(searchbar.value);
}

searchbar.addEventListener("keyup", event => {
    if (event.key === "Enter") {
        if (document.getElementById("search-results__heading").classList !== "") {
            document.getElementById("search-results__heading").classList.remove("search-results__heading--visibility");
        }
        search();
    }
});