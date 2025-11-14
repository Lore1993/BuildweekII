const baseUrl = "https://striveschool-api.herokuapp.com/api/deezer/album/"
const url = location.search // tutto il contenuto della barra degli indirizzi
console.log(url)
const allTheParameters = new URLSearchParams(url)
const id = allTheParameters.get("albumId")
console.log("ID", id)
const tabellaPrinci = document.getElementById("tabella-principale")

const getDetails = function () {
  fetch(baseUrl + id)
    .then((res) => {
      if (res.ok) {
        return res.json()
      } else {
        throw new Error(res.status)
      }
    })
    .then((album) => {
      console.log("album", album)
      const img = document.getElementById("cover")
      const title = document.getElementById("albumTitle")
      const metaData = document.getElementById("metaData")
      const pic = document.getElementById("pic")
      // richiamo la tabella da html
      const tabella = document.getElementById("tabella")
      pic.src = album.artist.picture_small
      img.src = album.cover_xl || album.cover_big || album.cover_medium
      title.innerText = album.title
      const autore = album.artist.name
      const year = album.release_date.slice(0, 4)
      const brani = album.nb_tracks
      const durataMinuti = Math.round((album.duration || 0) / 60)
      metaData.innerHTML = ` <a href="./artistpage.html?artistId=${album.artist.id}" class="text-decoration-none text-white">${autore}</a> • ${year} • ${brani} brani, ${durataMinuti} min`

      //aggiungo una riga vuota per distanziare la prima traccia dall'intestazione
      tabella.innerHTML = ` <tr><td class="bg-transparent" colspan="4" style="height: 15px; border: none;"></td></tr>`

      // prova
      const colorRGB = []
      const colorThief = new ColorThief()
      const divColor = document.getElementById("background-color")
      const rgbToHex = (r, g, b) =>
        "#" +
        [r, g, b]
          .map((x) => {
            const hex = x.toString(16)
            return hex.length === 1 ? "0" + hex : hex
          })
          .join("") //#023003
      img.onload = () => {
        const color = colorThief.getColor(img) // [r,g,b] [23,45,67]
        console.log("rgb", color)

        // divColor.style.backgroundColor = rgbToHex(color[0], color[1], color[2])
        divColor.style.backgroundImage = `linear-gradient(0deg,rgba(0, 0, 0, 1) 0%, rgba(${color[0]}, ${color[1]}, ${color[2]}, 1) 100%)`
        // background: linear-gradient(0deg,rgba(0, 0, 0, 1) 0%, rgba(253, 187, 45, 1) 100%);
      }

      //interpretazione forEach sottostrante:
      //prendo i dati delle tracce negli album e li giro singolarmente
      album.tracks.data.forEach((track, i) => {
        tabella.innerHTML += `
        <tr class="bg-transparent border-0" data-index="${i}">
         <th scope="row" class="bg-transparent text-secondary text-center pt-3 border-0" role="button">${
           i + 1
         }</th>
            <td class="bg-transparent text-white border-0" role="button"> 
             ${track.title}
            <br> <a href="./artistpage.html?artistId=${
              track.artist.id
            }" class="text-secondary text-decoration-none">${
          track.artist.name
        }</a></td>
          <td class="bg-transparent text-secondary border-0" role="button">${track.rank.toLocaleString(
            "it-IT"
          )}</td> 
         <td class="bg-transparent text-secondary border-0" role="button">${formatDuration(
           track.duration
         )}</td>
       </tr>
        `
        // uso "toLocaleString('it-IT')" per formattare il rank tornato dall API
        // quindi anzichè mostrare (123456789) mostro (123.456.789)
      })
    })
    .catch((err) => {
      console.log("ERRORE NEL RECUPERO DETTAGLI", err)
    })
}

getDetails()

const like = function (e) {
  e.classList.toggle("text-danger")
}

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

document.addEventListener("DOMContentLoaded", () => {
  // CONFIG
  const ALBUM_ID =
    new URLSearchParams(location.search).get("albumId") || "75621062"
  const API = `https://striveschool-api.herokuapp.com/api/deezer/album/${ALBUM_ID}`

  // DOM elementi player UI
  const tabella = document.getElementById("tabella")
  const albumPic = document.getElementById("album-pic")
  const titleTrack = document.getElementById("title-track")
  const artistName = document.getElementById("artist-name")

  const playBtnWrapper = document.getElementById("play") // elemento che contiene l'icona play
  const pauseBtnWrapper = document.getElementById("pause") // elemento che contiene l'icona pause
  const prevBtn = document.getElementById("backward")
  const nextBtn = document.getElementById("forward")
  const progressInput = document.getElementById("player") // input range per progresso
  const currentTimeEl = document.getElementById("current-time")
  const totalDurationEl = document.getElementById("total-duration")
  const volumeInput = document.getElementById("volume")

  // AUDIO
  const audio = new Audio()

  // stato
  let albumData = null
  let currentIndex = null
  let isPlaying = false

  // util
  function formatTime(sec) {
    sec = Math.floor(Number(sec) || 0)
    const m = Math.floor(sec / 60)
    const s = sec % 60
    return `${m}:${s.toString().padStart(2, "0")}`
  }

  // FETCH album e render tracks
  fetch(API)
    .then((r) => {
      if (!r.ok) throw new Error("Errore caricamento album")
      return r.json()
    })
    .then((album) => {
      albumData = album
      albumPic.src = album.cover_small || coverUrl
    })
    .catch((err) => {
      console.error(err)
    })

  // PLAY TRACK by index
  function playTrack(index) {
    if (!albumData) return
    const tracks = albumData.tracks?.data || []
    const track = tracks[index]
    if (!track) return

    if (!track.preview) {
      alert("Anteprima non disponibile per questa traccia.")
      return
    }

    currentIndex = index
    // imposta audio
    audio.src = track.preview
    audio.currentTime = 0
    audio.play().catch((e) => console.warn("Play fallito", e))

    // aggiorna barra player (left area)
    albumPic.src = albumData.cover_small || albumData.cover_medium || ""
    titleTrack.textContent = track.title
    artistName.textContent = track.artist?.name || ""

    // toggle icone play/pause
    playBtnWrapper.classList.add("d-none")
    pauseBtnWrapper.classList.remove("d-none")
    isPlaying = true

    // imposta durata massima del range (preview spesso 30s)
    const expectedDur = track.duration || 30
    progressInput.max = Math.floor(expectedDur)
    totalDurationEl.textContent = formatTime(expectedDur)
  }

  // EVENTS

  // click su tabella -> play selected
  tabella.addEventListener("click", (e) => {
    const row = e.target.closest("tr[data-index]")
    if (!row) return
    const index = Number(row.dataset.index)
    playTrack(index)
  })

  playBtnWrapper.addEventListener("click", () => {
    // se non c'è una traccia corrente, avvia la prima
    if (currentIndex === null) {
      // prova a trovare la prima traccia dell'album corrente, prende tutte le tracce, controlla che .lenght sia > 0 e fa partire la traccia
      const tracks = albumData?.tracks?.data || []
      if (tracks.length > 0) {
        playTrack(0)
        return
      } else return
    }
    // se abbiamo una canzone  caricato e in pausa -> play
    audio.play().catch((e) => console.warn(e)) //faccio partire l'audio e aggiungo controllo errori
    playBtnWrapper.classList.add("d-none") //cambio i pulsanti
    pauseBtnWrapper.classList.remove("d-none")
    isPlaying = true
  })

  // PAUSE track   NON FUNZIONA!!!!!!!!!!!!!
  function pauseTrack() {
    audio.pause()
    playBtnWrapper.classList.remove("d-none")
    pauseBtnWrapper.classList.add("d-none")
    isPlaying = false
  }
  // Funzionamento per PAUSE track
  pauseBtnWrapper.addEventListener("click", () => {
    pauseTrack()
  })

  // VOLUME: mappa valore input -> audio.volume (0..1)
  function setVolumeFromInput() {
    if (!volumeInput) return
    const val = Number(volumeInput.value || 2)
    const max = Number(volumeInput.max || 100)
    // se max è 1, usalo direttamente; altrimenti normalizza
    audio.volume = max === 1 ? val : val / max
  }
  // inizializza: se l'HTML ha value=0 e max vuoto, impostiamolo a 100 per UX
  if (volumeInput) {
    if (!volumeInput.max || Number(volumeInput.max) === 0) volumeInput.max = 100
    if (!volumeInput.value) volumeInput.value = 100
    setVolumeFromInput()
    volumeInput.addEventListener("input", setVolumeFromInput)
  }

  // NEXT
  function nextTrack() {
    if (!albumData) return
    const tracks = albumData.tracks?.data || []
    if (currentIndex === null) return
    if (currentIndex === null) currentIndex = 0
    const nextIndex = currentIndex + 1 < tracks.length ? currentIndex + 1 : 0
    //Controllo in che posizione dell'album mi trovo e controlla se esiste una traccia successiva.
    // Esemoio: se abbiamo 10 tracce, nell'array avremmo indici da 0 a 9.
    // Se siamo alla traccia 3 farà :  3 + 1 = 4 che è < 10 quindi ok.      MENTRE
    // Se siami alla traccia 9 farà 9 + 1 = 10 che NON è < 10 quindi fine lista
    //Qua allora usiamo operatore ternario e quindi:
    // condizione ? valore-se-vero : valore-se-falso
    // SE ESISTE una traccia dopo allora usa currentIndex + 1
    // ALTRIMENTI (sei all’ultima) allora torna a 0 (ricomincia da capo)
    playTrack(nextIndex)
  }

  //PREV
  function prevTrack() {
    if (!albumData) return
    const tracks = albumData.tracks?.data || []
    if (currentIndex === null) return
    if (currentIndex === null) currentIndex = 0
    const prevIndex =
      currentIndex - 1 >= 0 ? currentIndex - 1 : tracks.length - 1 //vedi riga 266-273 per spiegazione funzionamento
    playTrack(prevIndex)
  }

  // Funzionamento per NEXT track
  nextBtn.addEventListener("click", () => {
    nextTrack()
  })

  // Funzionamento per PREV track
  prevBtn.addEventListener("click", () => {
    prevTrack()
  })
})
