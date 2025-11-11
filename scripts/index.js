const idAlbum1 = "230935602"
const idAlbum2 = "46787432"
const idAlbum3 = "568120942"
const idAlbum4 = "399123947"
const idAlbum5 = "80274812"

const arrayIdAlbum = [
  "245956", //La voce del padrone
  "46787432", //17
  "301773", //Mezzanine
  "421310217", //soñao
  "80274812", //Vuelves a Empezar
]

const baseUrl = "https://striveschool-api.herokuapp.com/api/deezer/album/"

const addAlbumHomepage = function () {
  arrayIdAlbum.forEach((id) => {
    console.log("aaa", baseUrl + id)
    fetch(baseUrl + id)
      .then((res) => {
        console.log("RESPONSE", res)
        if (res.ok) {
          return res.json()
        } else {
          throw new Error(
            `Errore nella risposta ricevuta dal server: ${res.status}`
          )
        }
      })
      .then((arrayOfAlbum) => {
        const rowAlbum = document.getElementById("rowAlbum")
        const div = document.createElement("div")

        div.innerHTML = `
              <div class="card bg-dark mx-auto my-2 h-100">
              <a href="./albumpage.html?albumId=${arrayOfAlbum.id}" class="text-decoration-none "><img src="${arrayOfAlbum.cover_medium}" class="card-img-top imgAlbum  object-fit-cover rounded-3 img-fluid " alt="Cover Album" /></a>
              <div class="card-body p-2 position-relative">
               <a href="./albumpage.html?albumId=${arrayOfAlbum.id}" class="text-decoration-none text-white"> <h5 class="card-title text-white mb-4" >${arrayOfAlbum.title}</h5></a>
                <a href="./artistpage.html?artistId=${arrayOfAlbum.artist.id}" class="text-decoration-none text-white"><p class="card-text text-white-50 position-absolute bottom-0">${arrayOfAlbum.artist.name}</p></a>
              </div>
            </div>
               
            `
        div.className = "col col-12 col-sm-6 col-md-6 col-lg-2 mx-auto"
        rowAlbum.appendChild(div)
      })

      .catch((err) => {
        console.log("PROBLEMA", err)
        // problemi di connessione, spina staccata etc.
      })
  })
}

addAlbumHomepage()

const showAlbum = function () {
  const titolo = document.getElementById("songTitle")
  const linkTitle = document.getElementById("linkAlbumTitle")
  const linkImg = document.getElementById("linkAlbumImg")
  const img = document.getElementById("cover")
  const author = document.getElementById("author")
  const linkauthor = document.getElementById("linkAuthor")
  const description = document.getElementById("description")
  const idAlbum = "12186994"

  fetch(baseUrl + idAlbum)
    .then((res) => {
      console.log("RESPONSE", res)
      if (res.ok) {
        return res.json()
      } else {
        throw new Error(
          `Errore nella risposta ricevuta dal server: ${res.status}`
        )
      }
    })
    .then((Album) => {
      titolo.innerText = `${Album.title}`
      img.src = `${Album.cover_big}`
      author.innerText = `${Album.artist.name}`
      description.innerText = `Ascolta il nuovo singolo di ${Album.artist.name}`
      linkTitle.href = `./albumpage.html?albumId=${Album.id}`
      linkImg.href = `./albumpage.html?albumId=${Album.id}`
      linkauthor.href = `./artistpage.html?artistId=${Album.artist.id}`
    })

    .catch((err) => {
      console.log("PROBLEMA", err)
    })
}
showAlbum()
