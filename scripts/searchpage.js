const baseUrl = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";

const btnSearch = document.getElementById("btn-search");
const inputSearch = document.getElementById("inputSearch");
const btnForm = document.getElementById("btn-search");
const form = document.getElementById("form");

btnForm.addEventListener("click", function (e) {
  e.preventDefault();

  const row = document.getElementById("row-card");
  if (inputSearch.value) {
    row.innerHTML = "";
  }

  if (inputSearch.value) {
    fetch(baseUrl + inputSearch.value)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error(res.status);
        }
      })
      .then((res) => {
        // MAP per evitare album duplicati
        const albumsMap = new Map();

        res.data.forEach((traccia) => {
          if (!albumsMap.has(traccia.album.title)) {
            albumsMap.set(traccia.album.title, traccia);
          }
        });

        // ottengo solo gli album unici
        const risultatiUnici = Array.from(albumsMap.values());

        // ora stampo solo risultati unici
        risultatiUnici.forEach((traccia) => {
          row.innerHTML += `
            <div class="col">
                <div class="card">
                    <img src="${traccia.album.cover_small}" class="card-img-top img-fluid" alt="img artist">
                    <div class="card-body">
                        <h5 class="card-title ">${traccia.album.title}</h5>
                    </div>
                </div>
            </div>
          `;
        });
      })
      .catch((err) => {
        console.log("ERRORE NEL RECUPERO DETTAGLI", err);
      });
  }
});
