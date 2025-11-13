const baseUrl = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";

const inputSearch = document.getElementById("inputSearch");
const btnForm = document.getElementById("btn-search");

btnForm.addEventListener("click", function (e) {
  e.preventDefault(); // evitiamo il reload del form!!

  const row = document.getElementById("row-card");
  const query = inputSearch.value.trim();

  // svuoto i risultati precedenti
  row.innerHTML = "";

  fetch(baseUrl + encodeURIComponent(query))
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(res.status);
      }
    })
    .then((res) => {
      //  per evitare album con lo stesso nome
      const albumsMap = new Map();

      res.data.forEach((traccia) => {
        const titoloAlbum = traccia.album.title;

        // se non abbiamo ancora visto questo titolo, lo aggiungiamo
        if (!albumsMap.has(titoloAlbum)) {
          albumsMap.set(titoloAlbum, traccia);
        }
      });

      // prendo solo i valori tracce uniche per album
      const albumsUnici = Array.from(albumsMap.values());

      // Controlliamo se un album è già stato aggiunto
      if (albumsUnici.length === 0) {
        row.innerHTML = `<p class="text-white">Nessun album trovato per "${query}"</p>`;
        return;
      }

      // stampo gli album (uno per titolo)
      albumsUnici.forEach((traccia) => {
        row.innerHTML += `
          <div class="col">
            <div class="card">
              <img src="${traccia.album.cover_small}" class="card-img-top img-fluid" alt="img artist">
              <div class="card-body">
                <h5 class="card-title">${traccia.album.title}</h5>
              </div>
            </div>
          </div>
        `;
      });
    })
    .catch((err) => {
      console.log("ERRORE NEL RECUPERO DETTAGLI", err);
      row.innerHTML = `<p class="text-danger">Errore nel recupero dei dati.</p>`;
    });
});
