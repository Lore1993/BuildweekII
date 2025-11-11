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
      pic.src = album.artist.picture_small;
      img.src = album.cover_medium;
      title.innerText = album.title;
      const autore = album.artist.name;
      const year = album.release_date.slice(0, 4);
      const brani = album.nb_tracks;
      const durataMinuti = Math.round((album.duration || 0) / 60);
      metaData.textContent = `${autore} • ${year} • ${brani} brani, ${durataMinuti} min`;
    })
    .catch((err) => {
      console.log("ERRORE NEL RECUPERO DETTAGLI", err);
    });
};

getDetails();
