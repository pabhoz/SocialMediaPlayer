class MusicPlayer {
	constructor(songName,artistName,src) {
		this.player = new Audio(src);
		//this.initDOMElement(songName,artistName);
	
		this.progressBar = document.querySelector(".progressBar");
		this.progressBar.onclick = (e) => {
			let pos = e.offsetX;
			let total = e.target.clientWidth;
			let p = (pos / total);
			this.player.currentTime = this.player.duration * p;
		}

		this.playBtn = document.querySelector("#play");
		this.playBtn.onclick = () => { this.play() };

		this.player.ontimeupdate = () => { this.updateData() };

	}

	set DOMElement(value){
		this._DOMElement = value;
	}

	get DOMElement(){
		return this._DOMElement;
	}

	initDOMElement(songName,artistName){
		let container = document.createElement("div");
		container.classList.add("musicPlayer");
		
		let prevSong = this._prevAndNextDomElement(true,"assets/covers/virtualscape.jpg");
		container.appendChild(prevSong);

		let player = this._playerDomElement(songName,artistName);
		container.appendChild(player);

		let nextSong = this._prevAndNextDomElement(false,"assets/covers/virtualscape.jpg");
		container.appendChild(nextSong);

		this.DOMElement = container;
	}

	play() {
		let icon = this.playBtn.querySelector("i");
		if(this.player.paused){
			icon.classList.remove("fa-play");
			icon.classList.add("fa-pause");
			this.player.play();
		}else{
			icon.classList.remove("fa-pause");
			icon.classList.add("fa-play");
			this.player.pause();
		}
	}

	updateData(){
		let p = (this.player.currentTime / this.player.duration) * 100;
		let bar = this.progressBar.querySelector(".bar");
        bar.style.width = `${p}%`
        this.updateTime(this.player.duration,"#controls .total");
        this.updateTime(this.player.currentTime,"#controls .current");
    }
    
    updateTime(data,selector){
		let x = data;
		var horas= Math.floor(x/3600); 
		var minutos = Math.floor((x -(horas*3600))/60);
		var segundos= Math.floor(x-(horas*3600)-(minutos*60));

		if (horas<10){horas = "0"+horas}
		if(minutos<10){minutos="0"+minutos}
		if(segundos<10){segundos="0"+segundos}
		var tiempoTo=horas+":"+minutos+":"+segundos;

		this.tiempoTotal = document.querySelector(selector);
		this.tiempoTotal.innerHTML=tiempoTo;
	}
}
