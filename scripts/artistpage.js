const baseUrl = "https://striveschool-api.herokuapp.com/api/deezer/artist/"
const url = location.search // tutto il contenuto della barra degli indirizzi
console.log(url)
const allTheParameters = new URLSearchParams(url)
const id = allTheParameters.get("artistId")
console.log("ID", id)

const artist = function () {
  fetch(baseUrl + id)
    .then((res) => {
      if (res.ok) {
        return res.json()
      } else {
        throw new Error(res.status)
      }
    })
    .then((artist) => {
      const title = document.getElementById("title")
      const description = document.getElementById("description")
      const backgroundImg = document.getElementById("background-img")
      const byArtistPic = document.getElementById("by-artist-pic")
      const like = document.getElementById("like")
      const byArtist = document.getElementById("by-artist")

      title.innerText = artist.name
      description.innerText =
        artist.nb_fan.toLocaleString("it-IT") + " ascoltatori mensili"
      backgroundImg.src =
        artist.picture_xl || artist.picture_big || artist.picture_medium
      byArtistPic.src = artist.picture_small
      like.innerText = `Hai messo Mi piace a ${Math.floor(
        Math.random() * 15
      )} brani`
      byArtist.innerText = "Di " + " " + artist.name
    })
    .catch((err) => {
      console.log("ERRORE NEL RECUPERO DETTAGLI", err)
    })
}
artist()

const artistTab = function () {
  fetch(baseUrl + id + "/top?limit=9")
    .then((res) => {
      if (res.ok) {
        return res.json()
      } else {
        throw new Error(res.status)
      }
    })
    .then((track) => {
      const rowTabella = document.getElementById("tabella")
      track.data.forEach((track, i) => {
        rowTabella.innerHTML += `<tr class="bg-transparent border-0">
         <th scope="row" class="bg-transparent text-secondary text-center pt-3 border-0">${
           i + 1
         }</th>
         <td class="bg-transparent border-0">
         <img class="img-fluid rounded-circle" src="${
           track.album.cover_small
         }" /></td>
          <td class="bg-transparent text-white border-0"><a href="./albumpage.html?albumId=${
            track.album.id
          }&trackId=${track.id}" 
         class="text-white text-decoration-none">
        ${track.title}
      </a> <br> <a href="./artistpage.html?artistId=${
        track.artist.id
      }" class="text-secondary text-decoration-none">${
          track.artist.name
        }</a></span></td>
          <td class="bg-transparent text-secondary border-0">${track.rank.toLocaleString(
            "it-IT"
          )}</td> 
         <td class="bg-transparent text-secondary border-0">${formatDuration(
           track.duration
         )}</td>
       </tr>`
      })
      // rowTabella.innerHTML=
    })
    .catch((err) => {
      console.log("ERRORE NEL RECUPERO DETTAGLI", err)
    })
}

artistTab()

//questa funzione "parte" anche se dichiarato dopo la chiamata (riga 39) per via di com'è scritta
// se l'avessimo scritta così: const formatDuration = (seconds) => { ... } dovevamo dichiararla prima di chiamarla
// questo perchè le funzioni dichiarate come quella sottostante vengono caricate in memoria prima dell’esecuzione del codice
function formatDuration(seconds) {
  // assicuro che sia un numero intero
  const totalSeconds = Math.floor(seconds)
  const minutes = Math.floor(totalSeconds / 60)
  const secs = totalSeconds % 60

  // se i secondi sono < 10, aggiunge uno zero davanti
  const formatted = `${minutes}:${secs.toString().padStart(2, "0")}`

  return formatted
}
