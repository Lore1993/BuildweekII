const arrayIdAlbum = [
  "75621062", // Bohemian Rapsody
  "46787432", //17
  "301773", //Mezzanine
  "421310217", //soñao
  "80274812", //Vuelves a Empezar
  "124656562",
  "15762534",
  "153406392",
  "1434890",
  "851013072",
];

const baseUrl = "https://striveschool-api.herokuapp.com/api/deezer/album/";

const addAlbumHomepage = function () {
  arrayIdAlbum.forEach((id) => {
    console.log("aaa", baseUrl + id);
    fetch(baseUrl + id)
      .then((res) => {
        console.log("RESPONSE", res);
        if (res.ok) {
          return res.json();
        } else {
          throw new Error(
            `Errore nella risposta ricevuta dal server: ${res.status}`
          );
        }
      })
      .then((arrayOfAlbum) => {
        const rowAlbum = document.getElementById("rowAlbum");
        const div = document.createElement("div");

        div.innerHTML = `
              <div class="card bg-dark mx-auto my-2 h-100 artist-card">
              <a href="./albumpage.html?albumId=${arrayOfAlbum.id}" class="text-decoration-none "><img src="${arrayOfAlbum.cover_medium}" class="card-img-top imgAlbum  object-fit-cover rounded-3 img-fluid " alt="Cover Album" /></a>
              <div class="card-body p-2 position-relative artist-card">
               <a href="./albumpage.html?albumId=${arrayOfAlbum.id}" class="text-decoration-none text-white"> <h5 class="card-title text-white mb-4" >${arrayOfAlbum.title}</h5></a>
                <a href="./artistpage.html?artistId=${arrayOfAlbum.artist.id}" class="text-decoration-none text-white"><p class="card-text text-white-50 position-absolute bottom-0 fs-6">${arrayOfAlbum.artist.name}</p></a>
              </div>
            </div>
               
            `;
        div.className = "col col-12 col-sm-6 col-md-6 col-lg-2 mx-auto";
        rowAlbum.appendChild(div);
      })

      .catch((err) => {
        console.log("PROBLEMA", err);
        // problemi di connessione, spina staccata etc.
      });
  });
};

addAlbumHomepage();

const showAlbum = function () {
  const titolo = document.getElementById("songTitle");
  const linkTitle = document.getElementById("linkAlbumTitle");
  const linkImg = document.getElementById("linkAlbumImg");
  const img = document.getElementById("cover");
  const author = document.getElementById("author");
  const linkauthor = document.getElementById("linkAuthor");
  const description = document.getElementById("description");
  const arrayIdAlbum = ["12186994", "616950", "76353", "144718432"]; //Lucio, Pupo, Giggi,Simpatia
  const n = Math.floor(Math.random() * 4);
  const idAlbum = arrayIdAlbum[n];

  fetch(baseUrl + idAlbum)
    .then((res) => {
      console.log("RESPONSE", res);
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(
          `Errore nella risposta ricevuta dal server: ${res.status}`
        );
      }
    })
    .then((Album) => {
      titolo.innerText = `${Album.title}`;
      img.src = `${Album.cover_big}`;
      author.innerText = `${Album.artist.name}`;
      description.innerText = `Ascolta il nuovo singolo di ${Album.artist.name}`;
      linkTitle.href = `./albumpage.html?albumId=${Album.id}`;
      linkImg.href = `./albumpage.html?albumId=${Album.id}`;
      linkauthor.href = `./artistpage.html?artistId=${Album.artist.id}`;
    })

    .catch((err) => {
      console.log("PROBLEMA", err);
    });
};
showAlbum();

const arrayIdArtist = [9822974, 180, 612, 12313080, 869356, 69820, 458, 554792, 266506, 927];

const baseUrlArtist =
  "https://striveschool-api.herokuapp.com/api/deezer/artist/";

const showArtist = function () {
  const rowArtist = document.getElementById("row-Artist");
  arrayIdArtist.forEach((Id) => {
    fetch(baseUrlArtist + Id)
      .then((res) => {
        console.log("RESPONSE", res);
        if (res.ok) {
          return res.json();
        } else {
          throw new Error(
            `Errore nella risposta ricevuta dal server: ${res.status}`
          );
        }
      })
      .then((Artist) => {
        rowArtist.innerHTML += `<div
                class="col-6 col-md-2 text-center my-3 artist-card position-relative"
              >
                <a href="./artistpage.html?artistId=${Artist.id}" class="text-decoration-none text-white"><img
                  class="rounded-circle border border-1 w-100"
                  src="${Artist.picture_medium}"
                /></a>
                <a href="./artistpage.html?artistId=${Artist.id}" class="text-decoration-none text-white"><button
                  type="button"
                  class="btn rounded-circle text-black play-btn buttonplay"
                >
                  <i class="bi bi-play-circle play-icon fs-5"></i>
                </button></a>
                <a href="./artistpage.html?artistId=${Artist.id}" class="text-decoration-none text-white"><h5 class="mt-2 mb-1 text-start text-white">
                 ${Artist.name}
                </h5></a>
                <small class="text-white-50 text-start d-block"
                  >Artist</small
                >
              </div>`;
      })

      .catch((err) => {
        console.log("PROBLEMA", err);
      });
  });
};
showArtist();
