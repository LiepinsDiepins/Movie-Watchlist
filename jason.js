document.getElementById('searchBtn').addEventListener('click', searchMovie);
document.getElementById('movieInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') searchMovie();
});

const popularMovies = [
    'The Shawshank Redemption',
    'The Godfather',
    'The Dark Knight',
    'Pulp Fiction',
    'Forrest Gump',
    'Inception',
    'The Matrix',
    'Avengers: Endgame',
    'Spirited Away',
    'Parasite',
    'Interstellar',
    'The Lion King'
];

document.addEventListener('DOMContentLoaded', function() {
    loadRandomMovies();
});

async function loadRandomMovies() {
    const randomMoviesGrid = document.getElementById('randomMovies');
    randomMoviesGrid.innerHTML = '';
  
   const shuffled = [...popularMovies].sort(() => 0.5 - Math.random());
    const selectedMovies = shuffled.slice(0, 6);
   
    for (const movieTitle of selectedMovies) {
        try {
            const movie = await fetchMovieData(movieTitle);
            if (movie && movie.Response === "True") {
                const movieCard = createMovieCard(movie);
                randomMoviesGrid.appendChild(movieCard);
            }
        } catch (error) {
            console.error('Error loading random movie:', error);
        }
    }
}

function WatchModeAPI(watch) {
    const axios = require('axios');

const getStreamingAvailability = async (titleId) => {
    try {
        const response = await axios.get(`https://api.watchmode.com/v1/title/${titleId}?apiKey=YUPKihGylNlCVQG4uqKDMYyfLwuwk6lCtXgoxf7z`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

getStreamingAvailability('101');
}

function createMovieCard(movie) {
    const card = document.createElement('div');
    card.className - 'movie-card';
    card.innerHTML = `
        <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/200x300/333/fff?text=No+Image'}" 
        alt="${movie.Title}"
        <h3>${movie.Title}</h3>
        <p>${movie.Year}</p>
    `;

    card.addEventListener('click', () => {
        document.getElementById('movieInput').value = movie.Title;
        searchMovie();
    })

    return card;
}

async function searchMovie() {
    const movieTitle = document.getElementById('movieInput').value.trim();
    if (!movieTitle) return;
    
    const movieDiv = document.getElementById('movie');
    movieDiv.innerHTML = '<div style="text-align: center; padding: 20px;">Loading...</div>';
    movieDiv.classList.add('active');
    
    try {
        const movie = await fetchMovieData(movieTitle);
        displayMovieResults(movie);

        const watchmodeApiKey = 'YUPKihGylNlCVQG4uqKDMYyfLwuwk6lCtXgoxf7z';

        const searchRes = await fetch(`https://api.watchmode.com/v1/search/?apiKey=${watchmodeApiKey}&search_field=name&search_value=${encodeURIComponent(movieTitle)}`);
        const searchData = await searchRes.json();

        if (searchData.title.results.length > 0) {
            const movieId = searchData.title_results[0].id;

            const sourcesRes = await fetch(`https://api.watchmode.com/v1/title/${movieId}/sources/?apiKey=${watchmodeApiKey}`);
            const sourcesData = await sourcesRes.json();

            const bestSource = sourcesData.find(source => source.type === 'free' || source.type === 'sub');

                }
                if (bestSource) {
                    const watchDiv =document.createElement('div');
                    watchDiv.className = 'watch-link';
                    watchDiv.innerHTML = `
                        <p><strong>Skaties šeit:</strong> ${bestSource.web_url}${bestSource.name}</a></p>
                    `;
                    movieDiv.appendChild(watchDiv);
                }

    } catch (error) {
        console.error('Error:', error);
        movieDiv.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-triangle"></i>
                <p>Something went wrong. Please try again.</p>
            </div>
        `;
    }
}

async function fetchMovieData(movieTitle) {
    const apiKey = 'a833c3fc';
    const url = `https://www.omdbapi.com/?t=${encodeURIComponent(movieTitle)}&apikey=${apiKey}`;
    
    const res = await fetch(url);
    return await res.json();
}

function displayMovieResults(data) {
    const movieDiv = document.getElementById('movie');
    
    if (data.Response === "True") {
        movieDiv.innerHTML = `
            <div class="movie-details">
                <img src="${data.Poster !== 'N/A' ? data.Poster : 'https://via.placeholder.com/300x450/333/fff?text=No+Image'}" 
                     alt="${data.Title}" 
                     class="movie-poster"
                     onerror="this.src='https://via.placeholder.com/300x450/333/fff?text=No+Image'">
                <div class="movie-info">
                    <h2>${data.Title} (${data.Year})</h2>
                    <div class="movie-meta">
                        <span class="meta-item">⭐ ${data.imdbRating}/10</span>
                        <span class="meta-item">⏱️ ${data.Runtime}</span>
                        <span class="meta-item">🎭 ${data.Genre}</span>
                    </div>
                    <p class="movie-plot">${data.Plot}</p>
                    <div class="detail-row">
                        <i class="fas fa-user-tie"></i>
                        <strong>Director:</strong> ${data.Director}
                    </div>
                    <div class="detail-row">
                        <i class="fas fa-users"></i>
                        <strong>Actors:</strong> ${data.Actors}
                    </div>
                    <div class="detail-row">
                        <i class="fas fa-globe"></i>
                        <strong>Language:</strong> ${data.Language}
                    </div>
                    <div class="detail-row">
                        <i class="fas fa-award"></i>
                        <strong>Awards:</strong> ${data.Awards}
                    </div>
                </div>
            </div>
        `;
    } else {
        movieDiv.innerHTML = `
            <div class="error-message">
                <i class="fas fa-film"></i>
                <p>Movie not found. Please try another title.</p>
            </div>
        `;
    }
}