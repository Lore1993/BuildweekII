const baseUrl = "https://striveschool-api.herokuapp.com/api/deezer/search?q="
// const url = location.search; // tutto il contenuto della barra degli indirizzi
// console.log(url);
// const allTheParameters = new URLSearchParams(url);
// const id = allTheParameters.get("search?q");
// console.log("ID", id);

const btnSearch = document.getElementById("btn-search")

// btnSearch.addEventListener("click", (e) => {
//   const urlParams = new URLSearchParams(window.location.search);

//   urlParams.set("search?q", inputSearch.value);

//   window.location.search = urlParams;
// });
const inputSearch = document.getElementById("inputSearch")
const btnForm = document.getElementById("btn-search")
// Aggiungo l'evento al click del pulsante (non del form)
btnForm.addEventListener("click", function (e) {
  e.preventDefault() // evitiamo il reload del form!!
  // se l'input è presente prendo il base url e ci aggiungo l'input dell'utente
  if (inputSearch.value) {
    fetch(baseUrl + inputSearch.value)
      .then((res) => {
        if (res.ok) {
          return res.json()
        } else {
          throw new Error(res.status)
        }
      })
      .then((res) => {
        res.data.forEach((artista) => {
          const row = document.getElementById("row-card")
          row.innerHTML += `
            <div class="col">
                <div class="card">
                    <img src="${artista.artist.picture}" class="card-img-top img-fluid" alt="img artist">
                    <div class="card-body">
                        <h5 class="card-title ">${artista.artist.name}</h5>
                       
                    </div>
                </div>
            </div>
        `
        })
      })
      .catch((err) => {
        console.log("ERRORE NEL RECUPERO DETTAGLI", err)
      })
  }
})
