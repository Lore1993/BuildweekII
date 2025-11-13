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
const form = document.getElementById("form")
// Aggiungo l'evento al click del pulsante (non del form)
btnForm.addEventListener("click", function (e) {
  e.preventDefault() // evitiamo il reload del form!!
  // se l'input è presente prendo il base url e ci aggiungo l'input dell'utente
  const row = document.getElementById("row-card")
  if (inputSearch.value) {
    row.innerHTML = ""
  }

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
        res.data.forEach((traccia) => {
          row.innerHTML += `
            <div class="col col-12 col-md-4 col-lg-2 text-center my-3  ">
                 <a href="./albumpage.html?albumId=${traccia.album.id}" class="text-decoration-none text-white"><div class="card bg-dark artist-card text-white" style= "width:150px; height:275px;">
                     <img src="${traccia.album.cover_medium}" class="card-img-top img-fluid" alt="img artist">
                    <div class="card-body artist-card">
                         <p class="card-title fs-6 ">${traccia.album.title}</p>
                       
                    </div>
                </div></a>
            </div>
        `
        })
      })

      .catch((err) => {
        console.log("ERRORE NEL RECUPERO DETTAGLI", err)
      })
  }
})
