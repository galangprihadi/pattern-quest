////////////////////////////////////////////=========================
///////////////////////////////////////////            READER CLASS
//////////////////////////////////////////===========================

//==== Class Structure ====//
//                         //
//     GameEngine          //
//       |--> Reader       //
//       |--> Question     //
//                         //
//=========================//


class Reader {
    constructor(rData) {
        // init
        this.markerMode = rData.markerMode || false;
        this.infoMode = rData.infoMode || false;

        this.pattPaths = rData.patternPaths;
        this.setImages();

        this.tagRef = rData.tagRef || 80,   // Tag reference (shortest tag) in pixel value  |  the shortest tag is 18 mm
        this.acceptedRange = 5,             // Acceptance Value for reading process (in unit value)

        // Tag ID              1     2     3     4     5     6     7     8     9     10    11    12
        // Tip Distance        18mm  20mm  22mm  24mm  26mm  28mm  30mm  32mm  34mm  36mm  38mm  40mm
        this.unitDistances  = [100,  112,  123,  135,  147,  158,  170,  181,  192,  205,  216,  228];

        this.markers = {};

        // Variables
        this.TagId = 0;
        this.unitValue = 0;
        this.pixelValue = 0;
        
        // container
        this.eContainer = document.querySelector(".container-scanner");

        // scanner
        this.eScanner = document.createElement("div");
        this.eScanner.classList.add("scanner");

        this.eScanner.addEventListener("touchstart", (event) => {
            this.readTag(event);
        });

        this.eScanner.addEventListener("touchmove", (event) => {
            this.readTag(event);
        });

        this.eScanner.addEventListener("touchend", (event) => {
            this.readTag(event);
        });

        this.eScanner.addEventListener("touchcancel", (event) => {
            this.readTag(event);
        });

        this.eContainer.append(this.eScanner);

        // information box
        if (this.infoMode) {
            this.eInfo = document.createElement("div");
            this.eInfo.classList.add("info");
            this.eInfo.textContent = "No Touch";
            this.eScanner.append(this.eInfo);
        }
    }

    resetTag() {
        this.TagId = 0;
        this.unitValue = 0;
        this.pixelValue = 0;

        this.eScanner.removeAttribute("style");
    }

    readTag(event) {
        event.preventDefault();

        const touches = Array.from(event.touches).filter(touch => touch.target === this.eScanner);
        const touchPos = [];
        
        // Read Distances
        if (touches.length >= 2) {
            for (let i=0; i < touches.length; i++) {
                // Read each tip
                const touch = touches[i];
                const touchId = touch.identifier;
                const x = touch.clientX - this.eScanner.getBoundingClientRect().left;
                const y = touch.clientY - this.eScanner.getBoundingClientRect().top;
                touchPos.push({x, y});

                // Draw tip markers
                if (this.markerMode) {
                    if (!this.markers[touchId]) {
                        const point = document.createElement("div");
                        point.classList.add("tipMarker");
                        this.eScanner.appendChild(point);
                        this.markers[touchId] = point;
                    }

                    this.markers[touchId].style.left = `${x}px`;
                    this.markers[touchId].style.top = `${y}px`;
                }
            }
        }
        else if (touches.length === 0) {
            if (this.infoMode) this.eInfo.textContent = "No Touch";
        }
        else {
            // Delete tip markers
            Object.keys(this.markers).forEach(touchId => {
                if (this.markers[touchId]) {
                    this.eScanner.removeChild(this.markers[touchId]);
                    delete this.markers[touchId];
                }
            });
        }

        this.pixelValue = this.getPixelValue(touchPos);
        this.unitValue = this.getUnitValue(touchPos);
        this.TagId = this.getTagId(touchPos);

        if (this.TagId > 0) {
            this.eScanner.style.backgroundColor = "var(--color-whiteSmoke)";
            this.eScanner.style.backgroundImage = `url("${this.pattImages[this.TagId].src}")`;
        }

        if (touches.length > 0) {
            //if (this.infoMode) this.eInfo.textContent = `${touches.length} tc | ${this.pixelValue} px | ${this.unitValue} un`;
            if (this.infoMode) this.eInfo.textContent = `Tag ID ${this.TagId}`;
        }
        else {
            if (this.infoMode) this.eInfo.textContent = "No Touch";
        }
    }

    getPixelValue(touchPos) {
        let maxDistance = 0;

        if (touchPos.length >= 2) {
            for (let i = 0; i < touchPos.length; i++) {
                for (let j = i + 1; j < touchPos.length; j++) {
                    const dx = touchPos[j].x - touchPos[i].x;
                    const dy = touchPos[j].y - touchPos[i].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance > maxDistance) {
                        maxDistance = Math.round(distance);
                    }
                }
            }
        }

        return maxDistance;
    }

    getUnitValue(touchPos) {
        if (touchPos.length >= 2) {
            return Math.round(this.getPixelValue(touchPos) / this.tagRef * 100);    // Convert pixel value to unit value
        }
        else {
            return 0;
        }
    }

    getTagId(touchPos) {
        let tipId = 0;

        for (let i=0; i < this.unitDistances.length; i++) {
            if (this.unitValue > this.unitDistances[i] - this.acceptedRange && this.unitValue < this.unitDistances[i] + this.acceptedRange) {
                tipId = i + 1;
            }
        }
        
        if (touchPos.length == 2) {
            switch (tipId) {
                case 1 : return 1;
                case 2 : return 2;
                case 3 : return 3;
                case 4 : return 4;
                case 5 : return 5;
                case 6 : return 6;
                case 7 : return 7;
                case 8 : return 8;
                case 9 : return 9;
                case 10 : return 10;
                case 11 : return 11;
                case 12 : return 12;
            }
        }

        return this.TagId;
    }

    loadAllImages(paths) {
        const loadPromises = [];
        const loadedImages = {};

        paths.forEach((path, index) => {
            const img = new Image();

            const promise = new Promise((resolve, reject) => {
                img.onload = () => {
                    loadedImages[index + 1] = img; 
                    resolve();
                };
                img.onerror = () => {
                    reject(new Error(`Failed to load image: ${path}`)); 
                };
            });

            img.src = path;
            loadPromises.push(promise);
        });

        return Promise.all(loadPromises).then(() => loadedImages);
    }

    async setImages() {
        try {
            const images = await this.loadAllImages(this.pattPaths);
            this.pattImages = images;
            //this.setQuestion();
            this.eScanner.style.backgroundImage = `url(${this.pattImages[1]})`
        } 
        catch (error) {
            console.log("setImages() error : ");
        }
    }
}