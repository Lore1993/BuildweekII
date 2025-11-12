const baseUrl = "https://striveschool-api.herokuapp.com/api/deezer/artist/";
const url = location.search; // tutto il contenuto della barra degli indirizzi
console.log(url);
const allTheParameters = new URLSearchParams(url);
const id = allTheParameters.get("artistId");
console.log("ID", id);

const artist = function () {
  fetch(baseUrl + id )
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(res.status);
      }
    })
    .then((artist) => {
      const title=document.getElementById("title");
      const description =document.getElementById("description");
      const backgroundImg=document.getElementById("background-img");

      title.innertext =artist.name;
      description.innertext =artist.nb_fan.toLocaleString("it-IT")+" ascoltatori mensili";
      backgroundImg.src = artist.picture_medium;
    })
    .catch((err) => {
      console.log("ERRORE NEL RECUPERO DETTAGLI", err);
    });
};
artist();


// const artistTab = function () {
 // fetch(baseUrl + id + "/top?limit=9")
   // .then((res) => {
     // if (res.ok) {
      //  return res.json();
     // } else {
      //  throw new Error(res.status);
     // }
   // })
   // .then((track) => {
    //  const title = document.getElementById("title")
     // const description = document.getElementById("description")
     // const backgroundImg= document.getElementById("background-img")
     // const rowTabella = document.getElementById("tabella")

     // title.innertext =track.data.contributors.name
     // description.innertext =track.
   // })
   // .catch((err) => {
     // console.log("ERRORE NEL RECUPERO DETTAGLI", err);
   // });
// };



//questa funzione "parte" anche se dichiarato dopo la chiamata (riga 39) per via di com'è scritta
// se l'avessimo scritta così: const formatDuration = (seconds) => { ... } dovevamo dichiararla prima di chiamarla
// questo perchè le funzioni dichiarate come quella sottostante vengono caricate in memoria prima dell’esecuzione del codice
function formatDuration(seconds) {
  // assicuro che sia un numero intero
  const totalSeconds = Math.floor(seconds);
  const minutes = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;

  // se i secondi sono < 10, aggiunge uno zero davanti
  const formatted = `${minutes}:${secs.toString().padStart(2, "0")}`;

  return formatted;
}
