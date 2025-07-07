//==================================
//  Tag Reader for Pattern Quest
//  Version 1.0
//
//  July 3, 2025
//  Galang P Mahardhika
//==================================


let touchNumber = 0;        // number of active touches

let refTag = 91;            // 20 mm (shortest tag) in pixel value
const acceptedRange = 5.1;  // in unit value

// distance (mm) =  20   22   24   26   28   30   32   34   36   38
// tip value     =  1    2    3    4    5    6    7    8    9    10
const unitValue  = [100, 110, 120, 131, 141, 151, 161, 172, 182, 192];

console.log(window.innerWidth + " | " + window.innerHeight);


//============================================ READER FUNCTION (Instance of tag scanner)

function setReader(touchAreaId, imageId, tagId, nameId, descId, questSound) {
    const eTouchArea = document.getElementById(touchAreaId);
    const eImage = document.getElementById(imageId);
    const eTag = document.getElementById(tagId);
    const eName = document.getElementById(nameId);
    const eDesc = document.getElementById(descId);

    const touchPoints = {};

    eTouchArea.addEventListener('touchstart', (event) => {
        event.preventDefault();
        readTag(event.touches);
    });

    eTouchArea.addEventListener('touchend', (event) => {
        event.preventDefault();
        readTag(event.touches);
    });

    eTouchArea.addEventListener('touchmove', (event) => {
        event.preventDefault();
        readTag(event.touches);
    });

    eTouchArea.addEventListener('touchcancel', (event) => {
        event.preventDefault();
        readTag(event.touches);
    });


    //#######################################################################
    // READ TAG (Update tag id, item image, item name, and item description)
    //#######################################################################

    function readTag(touches) {
        const filteredTouches = Array.from(touches).filter(touch => touch.target === eTouchArea);
        const positions = [];
        let holdButton = false;
        
        if (filteredTouches.length >= 2 && filteredTouches.length <= 4) {
            //playScanSound();

            for (let i = 0; i < filteredTouches.length; i++) {

                // Read each tip
                const touch = filteredTouches[i];
                const touchId = touch.identifier;
                const x = touch.clientX - eTouchArea.getBoundingClientRect().left;
                const y = touch.clientY - eTouchArea.getBoundingClientRect().top;
                positions.push({ x, y });

                // Draw touch point
                if (!touchPoints[touchId]) {
                    const point = document.createElement('div');
                    point.classList.add('touchPoint');
                    eTouchArea.appendChild(point);
                    touchPoints[touchId] = point;
                }

                const pointElement = touchPoints[touchId];
                pointElement.style.left = `${x}px`;
                pointElement.style.top = `${y}px`;
            }

            eTouchArea.setAttribute("tagValue", getTagId(positions));
            if(eTag) eTag.textContent = getTagId(positions);
            if(eImage) eImage.setAttribute("src", `assets/images/${items[getTagId(positions)-1].img}`);
            if(eName) eName.textContent = items[getTagId(positions)-1].name;
            if(eDesc) eDesc.textContent = items[getTagId(positions)-1].desc;
        }
        else if(filteredTouches.length == 1 && questSound == true){
            //playQuestSound();
        }
        else {            
            Object.keys(touchPoints).forEach(touchId => {
                if (touchPoints[touchId]) {
                    eTouchArea.removeChild(touchPoints[touchId]);
                    delete touchPoints[touchId];
                }
            });
        }

        touchNumber = filteredTouches.length;
    }
}


//#########################################
// GET TAG ID (Return tag ID from 0 to 30)
//#########################################

function getTagId(positions) {
    let minDistance = Infinity;
    let maxDistance = 0;

    let alldistances = [];

    // Checking minDistance and maxDistance
    for (let i = 0; i < positions.length; i++) {
        for (let j = i + 1; j < positions.length; j++) {
            const dx = positions[j].x - positions[i].x;
            const dy = positions[j].y - positions[i].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < minDistance) {
                minDistance = distance;
            }

            if (distance > maxDistance) {
                maxDistance = distance;
            }

            alldistances.push(distance.toFixed(0));
        }
    }

    // Normalizing minDistance and maxDistance
    minDistance = minDistance / refTag * 100;
    maxDistance = maxDistance / refTag * 100;
    
    // Generate result
    if (positions.length == 2) {
        switch (getTipValue(maxDistance)) {
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
        }
    }
    else if (positions.length == 3) {
        switch (getTipValue(maxDistance)) {
            case 1 : return 11;
            case 2 : return 12;
            case 3 : return 13;
            case 4 : return 14;
            case 5 : return 15;
            case 6 : return 16;
            case 7 : return 17;
            case 8 : return 18;
            case 9 : return 19;
            case 10 : return 20;
        }
    }
    else if (positions.length == 4) {
        switch (getTipValue(maxDistance)) {
            case 1 : return 21;
            case 2 : return 22;
            case 3 : return 23;
            case 4 : return 24;
            case 5 : return 25;
            case 6 : return 26;
            case 7 : return 27;
            case 8 : return 28;
            case 9 : return 29;
            case 10 : return 30;
        }
    }
    

    return 0;
}


//#################################################################
// GET TIP VALUE (Return tip value from 0 - 10 based on tip distances)
//#################################################################

function getTipValue (value) {
    for (let i=0; i < unitValue.length; i++) {
        if (value > unitValue[i] - acceptedRange && value < unitValue[i] + acceptedRange ) {
            return i + 1;
        }
    }

    return 0;
}


//#########################################################
// GET PIXEL VALUE (Return pixel value based on tip distances)
//#########################################################

function getPixelValue(positions) {
    if (positions.length < 2) {
        return positions.length + " Touch";
    }
    else {
        let alldistances = [];

        // Plot all distances
        for (let i = 0; i < positions.length; i++) {
            for (let j = i + 1; j < positions.length; j++) {
                const dx = positions[j].x - positions[i].x;
                const dy = positions[j].y - positions[i].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                alldistances.push(distance.toFixed(0));
            }
        }

        alldistances = alldistances.sort(function(a, b){return a - b});
        return alldistances.join("  |  ") + " pixel";
    }
}


//#################################################################
// GET UNIT VALUE (Return unit from 100 to 192 based on tip distances)
//#################################################################

function getUnitValue(positions) {
    if (positions.length < 2) {
        return positions.length + " Touch";
    }
    else {
        let alldistances = [];

        // Plot all distances
        for (let i = 0; i < positions.length; i++) {
            for (let j = i + 1; j < positions.length; j++) {
                const dx = positions[j].x - positions[i].x;
                const dy = positions[j].y - positions[i].y;
                const distance = Math.sqrt(dx * dx + dy * dy)/refTag*100;;

                alldistances.push(distance.toFixed(0));
            }
        }

        alldistances = alldistances.sort(function(a, b){return a - b});
        return alldistances.join("  |  ") + " unit";
    }
}