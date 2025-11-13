const baseURL = "https://striveschool-api.herokuapp.com/api/deezer/album/";
const url = location.search; // tutto il contenuto della barra degli indirizzi
console.log(url);
const allTheParameters = new URLSearchParams(url);
const id = allTheParameters.get("albumId");
console.log("ID", id);

const getDetails = function () {
  fetch(baseURL + "75621062")
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(res.status);
      }
    })
    .then((albums) => {
      const trackAlbum = albums.tracks.data;

      const albumPic = document.getElementById("album-pic");
      const titleTrack = document.getElementById("title-track");
      const artistName = document.getElementById("artist-name");
      const btnBackward = document.getElementById("backward");
      const btnForward = document.getElementById("forward");
      const btnPlay = document.getElementById("play");
      const btnPause = document.getElementById("pause");
      const currentTimeSong = document.getElementById("current-time");
      const loadplayerSong = document.getElementById("player");
      const totalDurationSong = document.getElementById("total-duration");
      const volume = document.getElementById("volume");

      albumPic.src = albums.cover_small;
      trackAlbum.forEach((song, i) => {
        titleTrack = trackAlbum[i].title;
      });
    })

    .catch((err) => {
      console.log("ERRORE NEL RECUPERO DETTAGLI", err);
    });
};

getDetails();
