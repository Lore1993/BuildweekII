const baseUrl = "https://striveschool-api.herokuapp.com/api/deezer/album/";
const url = location.search; // tutto il contenuto della barra degli indirizzi
console.log(url);
const allTheParameters = new URLSearchParams(url);
const id = allTheParameters.get("albumId");
console.log("ID", id);

const getDetails = function () {
  fetch(baseUrl + id)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(res.status);
      }
    })
    .then((album) => {
      console.log("album", album);
      const img = document.getElementById("cover");
      const title = document.getElementById("albumTitle");
      const metaData = document.getElementById("metaData");
      const pic = document.getElementById("pic");
      // richiamo la tabella da html
      const tabella = document.getElementById("tabella");
      pic.src = album.artist.picture_small;
      img.src = album.cover_xl || album.cover_big || album.cover_medium;
      title.innerText = album.title;
      const autore = album.artist.name;
      const year = album.release_date.slice(0, 4);
      const brani = album.nb_tracks;
      const durataMinuti = Math.round((album.duration || 0) / 60);
      metaData.innerHTML = ` <a href="./artistpage.html?artistId=${album.artist.id}" class="text-decoration-none text-white">${autore}</a> • ${year} • ${brani} brani, ${durataMinuti} min`;

      //aggiungo una riga vuota per distanziare la prima traccia dall'intestazione
      tabella.innerHTML = ` <tr><td class="bg-transparent" colspan="4" style="height: 15px; border: none;"></td></tr>`;

      // prova
      const colorRGB = [];
      const colorThief = new ColorThief();
      const divColor = document.getElementById("background-color");
      const rgbToHex = (r, g, b) =>
        "#" +
        [r, g, b]
          .map((x) => {
            const hex = x.toString(16);
            return hex.length === 1 ? "0" + hex : hex;
          })
          .join(""); //#023003
      img.onload = () => {
        const color = colorThief.getColor(img); // [r,g,b] [23,45,67]
        console.log("rgb", color);

        divColor.style.backgroundColor = rgbToHex(color[0], color[1], color[2]);
      };

      //interpretazione forEach sottostrante:
      //prendo i dati delle tracce negli album e li giro singolarmente
      album.tracks.data.forEach((track, i) => {
        tabella.innerHTML += `
        <tr class="bg-transparent border-0">
         <th scope="row" class="bg-transparent text-secondary text-center pt-3 border-0">${
           i + 1
         }</th>
          <td class="bg-transparent text-white border-0">${
            track.title
          } <br> <a href="./artistpage.html?artistId=${
          track.artist.id
        }" class="text-secondary text-decoration-none">${
          track.artist.name
        }</a></td>
          <td class="bg-transparent text-secondary border-0">${track.rank.toLocaleString(
            "it-IT"
          )}</td> 
         <td class="bg-transparent text-secondary border-0">${formatDuration(
           track.duration
         )}</td>
       </tr>
        `;
        // uso "toLocaleString('it-IT')" per formattare il rank tornato dall API
        // quindi anzichè mostrare (123456789) mostro (123.456.789)
      });
    })
    .catch((err) => {
      console.log("ERRORE NEL RECUPERO DETTAGLI", err);
    });
};

getDetails();

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
