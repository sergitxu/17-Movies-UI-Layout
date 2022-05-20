// const secreto = require('./secret.js');
const secretoLocal = localStorage.getItem("movieAPISecret");
const secreto = secretoLocal;

const API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${secreto}&page=1`;
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${secreto}&query="`;
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';

const form = document.getElementById('form');
const search = document.getElementById('search');
const main = document.getElementById('main');

/* Get initial movies */
getMovies(API_URL);

async function getMovies(url) {
    const res = await fetch(url);
    const data = await res.json();

    console.log(data);
    showMovies(data.results);
}

function showMovies(movies) {
    let colorVote = "";

    main.innerHTML = '';


    movies.forEach(movie => {

        const { title, poster_path, vote_average, overview } = movie;

        const movielEl = document.createElement('div');
        movielEl.classList.add('movie');

        movielEl.innerHTML = `
            <img class="movie__image" src="${IMG_PATH}${poster_path}" alt = "cinema">
            <div class="movie__info">
                <h3>${title}</h3>
                <span class="movie__value movie__value--${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="movie__overview">
                <h3>Overview</h3>
                ${overview}
            </div>
            `;

        main.appendChild(movielEl);
    });
}

function getClassByRate(rate) {
    if (rate >= 8) {
        return 'green';
    } else if (rate >= 5) {
        return 'orange';
    } else {
        return "red";
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = search.value;
    if (searchTerm && searchTerm !== '') {
        getMovies(`${SEARCH_API}${searchTerm} "`);
        search.value = '';
    } else {
        window.location.reload();
    }
});
