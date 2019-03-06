var user = {
    id: null,
    email: null,
    username: null,
    playlist: [],
    library: []
}
var servidor = `http://localhost/usbcali/web-2019I/AudioPlayerServer/users.php?ejecute=`;

//Session handling
if (typeof (Storage) !== "undefined") {
    user.username = sessionStorage.getItem("username");
    if (user.username == null) { window.location = "login.html"; }

    //consultamos la información del usuario
    var config = { method: 'GET', mode: 'cors' };

    fetch(`${servidor}getMyInfo&username=${user.username}`, config)
        .then(function (response) {
            response.json().then(function (u) {
                user = u;
                initSongs();
                initPlaylists();
            })
        });

} else {
    alert('Su navegador no soporta almacenamiento local. :(')
}

window.onload = () => {

    document.querySelector("#controls .user").innerHTML = user.username.charAt(0).toUpperCase();

    let items = document.querySelectorAll(".mainLeftBar .item");
    let menu = document.querySelector(".mediaContent .menu");
    items.forEach(item => {
        item.onclick = function () {
            let old = document.querySelector(".hover");
            if (old) { old.classList.remove("hover"); }
            if (!this.classList.contains("hover")) {
                this.classList.add("hover");
            }

            let title = document.querySelector("#mediaPlayer .menu .title");
            title.innerHTML = this.dataset.title;

            if (old == this || old == null) {
                menu.style.marginLeft = (menu.style.marginLeft != "0px") ? "0px" : `-${menu.clientWidth}px`;
            }
        }
    });

    let newMusicplayer = new MusicPlayer("Virtualscape", "Concepts", "assets/songs/virtualscape.mp3");
}

function initSongs() {
    let content = document.querySelector("#mediaPlayer .content");
    for (let i = 0; i < user.library.length; i++) {
        let element = document.createElement("div");
        element.classList.add("item");
        element.innerHTML = user.library[i].title;
        element.dataset.id = user.library[i].title;
        content.insertBefore(element, content.firstChild);
    }
}

function initPlaylists() {
    let content = document.querySelector("#mediaPlayer .menu");
    for (let i = 0; i < user.playlist.length; i++) {
        let element = document.createElement("div");
        element.classList.add("item");
        element.innerHTML = user.playlist[i].name;
        element.dataset.id = user.playlist[i].title;
        content.appendChild(element);
    }
}
