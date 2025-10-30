# Movie-Watchlist
Parasta vieta kur atrast filmas

 Projekta ideja — “Movie Watchlist”

Mērķis:
Izveidot tīmekļa lietotni, kur lietotājs var:

meklēt filmas pēc nosaukuma,

apskatīt filmas informāciju (žanrs, gads, vērtējums, plakāts utt.),

pievienot filmas savam “skatīties vēlāk” (watchlist),

izdzēst vai atzīmēt, kad noskatījies.


---API KEY:                    -----------------------------------------------------------

Here is your key: a833c3fc

Please append it to all of your API requests,

OMDb API: http://www.omdbapi.com/?i=tt3896198&apikey=a833c3fc

Click the following URL to activate your key: http://www.omdbapi.com/apikey.aspx?VERIFYKEY=6c580aab-3e87-4a89-b325-ddcc83d76c64
If you did not make this request, please disregard this email.



---Iespējams:                  -----------------------------------------------------------


kontu sistēmu (lietotājiem savas listes),

“favorītu” sadaļu,

reitingu sistēmu (lietotājs piešķir savu vērtējumu).


---Plāns darbiņam:                --------------------------------------------------------

 1. Plānošana – projekta struktūra

Vispirms izlem, vai taisīsi tikai front-end (JS + API) vai arī ar backendu (piem., Node.js / PHP + DB).
Sākumā var pilnīgi pietikt ar front-end + LocalStorage.

Vienkāršā versija (ieteicams sākumā):

Frontend only

HTML, CSS, JavaScript

OMDb API (bezmaksas filmas datiem)

LocalStorage (datu saglabāšanai)

🧩 2. Projekta mape un faili

Izveido mapi, piemēram, movie-watchlist, un tajā:

movie-watchlist/
│
├── index.html
├── style.css
├── script.js
└── README.md

🔑 3. OMDb API iegūšana

Ej uz https://www.omdbapi.com/

Spied “API Key” un ievadi e-pastu (bez maksas).

Tev nosūtīs e-pastā atslēgu, piemēram:

http://www.omdbapi.com/?apikey=YOUR_API_KEY&s=matrix

⚙️ 4. Pamata funkcionalitāte
Funkcija	Apraksts
🔍 Meklēt filmas	Lietotājs ievada nosaukumu, tu izmanto fetch() uz OMDb API
📄 Parādīt rezultātus	Rādi plakātu, nosaukumu, gadu
➕ Pievienot watchlist	Saglabā filmu LocalStorage
🗑️ Noņemt no watchlist	Izdzēš no saraksta
🎞️ Pārslēgšanās starp “Meklēšana” un “Watchlist” skatījumu	Vienkārša navigācija ar pogām
💡 5. UI / Dizaina idejas

Vienkāršs “Netflix style” izkārtojums — režģis ar plakātiem.

Meklēšanas josla augšā.

Divas sadaļas:

🔍 “Search”

🎬 “My Watchlist”

Katra filma kartiņā ar pogu “Add to Watchlist” vai “Remove”.

🧱 6. Funkciju kārtība (step-by-step)
STEP 1 — Izveido pamata HTML struktūru

Tīmekļa lapa ar:

virsrakstu (<h1>Movie Watchlist)

meklēšanas ievadi un pogu

divas sadaļas (#searchResults, #watchlist)

STEP 2 — Izveido funkciju meklēšanai (OMDb API)

Izmanto fetch("https://www.omdbapi.com/?apikey=YOUR_KEY&s=matrix")

Rādi rezultātus ekrānā (ar innerHTML un map())

STEP 3 — Pievienot “Add to Watchlist” pogu

Kad nospiež, saglabā filmu localStorage.setItem('watchlist', JSON.stringify(array))

STEP 4 — Izveido “My Watchlist” skatu

Nolasa no LocalStorage (JSON.parse) un parāda filmas.

Pievieno “Remove” pogu.

STEP 5 — Kosmētika (CSS)

Izveido kartiņas ar display: grid vai flex-wrap.

Pievieno hover efektus, krāsas, fontus.

🧠 7. Papildu idejas (ja būs laiks)

✅ Filtrē pēc žanra vai gada

⭐ Lietotāja “rating” (1–5 zvaigznes)

📅 “Date added” lauks

📊 Statistikā — cik filmas skatījies / plānots

🔒 Lietotāja login (vēlāk — ar Firebase vai vienkāršu PHP)

📘 8. Piemērs – sākuma JavaScript kods
// script.js
const API_KEY = "TAVA_API_KEY"; 
const searchInput = document.getElementById("search");
const searchBtn = document.getElementById("searchBtn");
const resultsEl = document.getElementById("results");
const watchlistEl = document.getElementById("watchlist");

let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

// Meklēšana
searchBtn.addEventListener("click", async () => {
  const query = searchInput.value.trim();
  if (!query) return;
  const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`);
  const data = await res.json();
  showResults(data.Search);
});

// Rāda rezultātus
function showResults(movies) {
  resultsEl.innerHTML = movies.map(movie => `
    <div class="movie">
      <img src="${movie.Poster}" alt="${movie.Title}" />
      <h3>${movie.Title}</h3>
      <p>${movie.Year}</p>
      <button onclick="addToWatchlist('${movie.imdbID}', '${movie.Title}', '${movie.Poster}')">Add</button>
    </div>
  `).join("");
}

// Pievieno watchlist
function addToWatchlist(id, title, poster) {
  if (!watchlist.some(m => m.id === id)) {
    watchlist.push({ id, title, poster });
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
    renderWatchlist();
  }
}

// Parāda watchlist
function renderWatchlist() {
  watchlistEl.innerHTML = watchlist.map(m => `
    <div class="movie">
      <img src="${m.poster}" alt="${m.title}" />
      <h3>${m.title}</h3>
      <button onclick="removeFromWatchlist('${m.id}')">Remove</button>
    </div>
  `).join("");
}

function removeFromWatchlist(id) {
  watchlist = watchlist.filter(m => m.id !== id);
  localStorage.setItem("watchlist", JSON.stringify(watchlist));
  renderWatchlist();
}

// Kad ielādējas
renderWatchlist();

📂 9. Kopsavilkums par soļiem
Solis	Ko dari
1	Izveido HTML struktūru (meklēšana + watchlist sadaļa)
2	Izveido JavaScript meklēšanas funkciju (OMDb API)
3	Rādi filmas un “Add to Watchlist” pogas
4	Saglabā LocalStorage un renderē watchlist
5	Uzlabo dizainu (CSS grid, krāsas, hover)
6	Pievieno papildfunkcijas (remove, zvaigznes, filtrs)
7	Testē, dokumentē, parādi projektā 💪
