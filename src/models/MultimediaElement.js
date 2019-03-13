class MultimediaElement{

    constructor(file){
        this.file = file;
        this._data = null;
    }

    get data (){
        return this._data;
    }

    set DOMElement(value){
        let isHTMLElement = value instanceof HTMLElement;
        if(isHTMLElement){
            this._DOMElement = value;
        }else{
            this._DOMElement = this.checkTypeAndSetElement();
        }
    }

    get DOMElement(){
        return this._DOMElement;
    }

    /**
     * @returns {HTMLElement} element
     */
    checkTypeAndSetElement(){
        var element = null;

        if(this.file.type == "image/png" || this.file.type == "image/gif"
        || this.file.type == "image/jpeg" || this.file.type == "image/webp"){
            element = document.createElement("img");
        }

        if(this.file.type == "audio/aac" || this.file.type == "audio/ogg"
        || this.file.type == "audio/mp3" || this.file.type == "audio/webm"){
            element = document.createElement("audio");
        }

        if(this.file.type == "video/mpeg" || this.file.type == "video/ogg"
        || this.file.type == "video/avi" || this.file.type == "video/webm"){
            element = document.createElement("video");
        }

        return element;
    }

    loadFileContent(){
        return new Promise((resolve, reject) => {
            this._readFileAsDataURL().then( (r) => {
                this.DOMElement = this.checkTypeAndSetElement();
                this._data = r;
                this.DOMElement.src = this._data;
                resolve();
            })
          });
    }

    _readFileAsDataURL(){
        return new Promise((resolve,reject) => {
            var freader = new FileReader();
    
            freader.onload =  function() {
                resolve(this.result);
            };

            freader.readAsDataURL(this.file);
        })
    }

}
