const idAlbum1 = "230935602";
const idAlbum2 = "46787432";
const idAlbum3 = "568120942";
const idAlbum4 = "399123947";
const idAlbum5 = "80274812";

const arrayIdAlbum = [
  "230935602", //La voce del padrone
  "46787432", //17
  "75621062", //Bohemian Rhapsody
  "421310217", //soñao
  "80274812", //Vuelves a Empezar
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
             
              <div class="card alburm-card bg-dark h-75 ">
                <img src="${arrayOfAlbum.cover_small}" class="card-img-top flex-grow-1 imgAlbum" alt="..."  />
                <div class="card-body p-0 py-1">
                  <h5 class="card-title text-white pt-3" id="ciao">${arrayOfAlbum.title}</h5>
                  <p class="card-text text-white-50 p-0 mt-3 ">${arrayOfAlbum.artist.name}</p>
                </div>
              
            
            `;
        div.classList.add("col");

        rowAlbum.appendChild(div);
      })

      .catch((err) => {
        console.log("PROBLEMA", err);
        // problemi di connessione, spina staccata etc.
      });
  });
};

addAlbumHomepage();
