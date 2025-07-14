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
        // Configuration
        
        this.numOfTagIds = 12;      // Number of tag ids used in game

        // Variables
        this.TagId = 0;
        this.pixelValue = 0;
        this.markers = {};

        // Init
        this.markerMode = rData.markerMode || false;                // To display a mark at each touch point (development process)
        this.infoMode = rData.infoMode || false;                    // To display screen tag reading information (development process)

        this.calibrationMode = rData.calibrationMode || false;      // For calibration process only

        this.pattPaths = rData.patternPaths;
        this.setImages();

        this.minDistance = parseFloat(localStorage.getItem("minDistance")) || 80;   // Shortest tip distance of Screen Tag (in pixel)
        this.maxDistance = parseFloat(localStorage.getItem("maxDistance")) || 182;  // Longest tip distance of Screen Tag (in pixel)
        this.toleranceRange = 3;                                                    // Tolerance value for reading process (in pixel)
        this.distanceRef = this.setDistanceRef(12);     // Calculate each tip distance (12 tip distances)
        this.isActive = true;
        
        // Generating the scanner
        this.eContainer = document.querySelector(".container-scanner");
        this.eScanner = document.createElement("div");
        this.eScanner.classList.add("scanner");

        this.eScanner.addEventListener("touchstart", (event) => {
            this.readTag(event);
            
        });

        this.eScanner.addEventListener("touchmove", (event) => {
            //this.readTag(event);
        });

        this.eScanner.addEventListener("touchend", (event) => {
            this.readTag(event);
        });

        this.eScanner.addEventListener("touchcancel", (event) => {
            this.readTag(event);
        });

        this.eContainer.append(this.eScanner);

        // Generating the information box (info mode)
        if (this.infoMode) {
            this.eInfo = document.createElement("div");
            this.eInfo.classList.add("info");
            this.eInfo.textContent = "No Touch";
            this.eScanner.append(this.eInfo);
        }
    }

    resetTag() {
        this.TagId = 0;
        this.pixelValue = 0;
        this.markers = {};

        this.eScanner.removeAttribute("style");
    }

    setDistanceRef(numOfTags) {
        let distances = [this.minDistance];
        const gap = (this.maxDistance - this.minDistance) / (numOfTags - 1);
        this.toleranceRange = gap/2;

        for (let i=1; i < numOfTags; i++) {
            distances.push(distances[i-1] + gap);
        }

        return distances;
    }

    readTag(event) {
        event.preventDefault();

        const touches = Array.from(event.touches).filter(touch => touch.target === this.eScanner);
        const touchPos = [];
        
        // Read Distances
        if (touches.length >= 2 && this.isActive) {
            this.isActive = false;

            setInterval(() => {
                this.isActive = true;
            }, 500);

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
        this.TagId = this.getTagId(touchPos);

        if (this.TagId > 0  && !this.calibrationMode) {
            this.eScanner.style.backgroundColor = "var(--color-whiteSmoke)";
            this.eScanner.style.backgroundImage = `url("${this.pattImages[this.TagId].src}")`;
        }

        if (touches.length > 0) {
            if (this.infoMode) this.eInfo.textContent = `${touches.length} tc | ${this.pixelValue} px`;
            //if (this.infoMode) this.eInfo.textContent = `Tag ID ${this.TagId}`;
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

    getTagId(touchPos) {
        let tipId = 0;

        for (let i=0; i < this.distanceRef.length; i++) {
            if (this.pixelValue > this.distanceRef[i] - this.toleranceRange && this.pixelValue < this.distanceRef[i] + this.toleranceRange) {
                tipId = i + 1;
            }
        }
        
        if (touchPos.length >= 2) {
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

    async setImages() {
        try {
            const images = await this.loadAllImages(this.pattPaths);
            this.pattImages = images;

            if (this.calibrationMode) {
                this.eScanner.style.backgroundColor = "var(--color-whiteSmoke)";
                this.eScanner.style.backgroundImage = `url("${this.pattImages[1].src}")`;
            }
        } 
        catch (error) {
            console.log("setImages() error : ");
        }
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
}