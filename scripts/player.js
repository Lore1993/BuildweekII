const baseURL = "https://striveschool-api.herokuapp.com/api/deezer/album/"
const url = location.search // tutto il contenuto della barra degli indirizzi
console.log(url)
const allTheParameters = new URLSearchParams(url)
const id = allTheParameters.get("albumId")
const trackAlbum = albums.tracks.data

const albumPic = document.getElementById("album-pic")
const titleTrack = document.getElementById("title-track")
const artistName = document.getElementById("artist-name")
const btnBackward = document.getElementById("backward")
const btnForward = document.getElementById("forward")
const btnPlay = document.getElementById("play")
const btnPause = document.getElementById("pause")
const currentTimeSong = document.getElementById("current-time")
const loadplayerSong = document.getElementById("player")
const totalDurationSong = document.getElementById("total-duration")
const volume = document.getElementById("volume")
let preview
let audio

const getDetails = function () {
  fetch(baseURL + id)
    .then((res) => {
      if (res.ok) {
        return res.json()
      } else {
        throw new Error(res.status)
      }
    })
    .then((albums) => {
      albumPic.src = albums.cover_small
      artistName.textContent = albums.artist.name

      trackAlbum.forEach((song, i) => {
        song = trackAlbum[i]
        titleTrack.textContent = song.title
        preview = song.preview
        audio = new Audio(preview)
      })
    })

    .catch((err) => {
      console.log("ERRORE NEL RECUPERO DETTAGLI", err)
    })
}

getDetails()

const play = function () {
  audio.play()
  //   btnPlay.
}
