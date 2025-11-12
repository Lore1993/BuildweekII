const baseUrl = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";
// const url = location.search; // tutto il contenuto della barra degli indirizzi
// console.log(url);
// const allTheParameters = new URLSearchParams(url);
// const id = allTheParameters.get("search?q");
// console.log("ID", id);

const btnSearch = document.getElementById("btn-search");

// btnSearch.addEventListener("click", (e) => {
//   const urlParams = new URLSearchParams(window.location.search);

//   urlParams.set("search?q", inputSearch.value);

//   window.location.search = urlParams;
// });
const inputSearch = document.getElementById("inputSearch");
inputSearch.addEventListener("load", function () {
  console.log("aaa", baseUrl, inputSearch.value);
  if (inputSearch) {
    fetch(baseUrl + inputSearch);
    console
      .log("aaa", baseUrl, inputSearch.value)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error(res.status);
        }
      })
      .then((result) => {
        result.artist.forEach((artist) => {
          const row = document.getElementById("row-card");
          row.innerHTML += `
            <div class="col">
                <div class="card">
                    <img src="${artist.picture}" class="card-img-top img-fluid" alt="...">
                    <div class="card-body">
                        <h5 class="card-title ">${artist.name}</h5>
                       
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
