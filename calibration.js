////////////////////////////////////////////===============================
///////////////////////////////////////////    CALIBRATION INITIALIZATION
//////////////////////////////////////////=================================


const cal = {
    readerA: new Reader({
        scoreMode: false,
        markerMode: true,
        infoMode: true,
        calibrationMode: true,
        patternPaths: ["images/patterns/patA1.png"]
    }),
    readerB: new Reader({
        scoreMode: false,
        markerMode: true,
        infoMode: true,
        calibrationMode: true,
        patternPaths: ["images/patterns/patA12.png"]
    }),
    timesA: 0,
    timesB: 0,
    valuesA: [],
    valuesB: [],
    counterA: document.getElementById("counterA"),
    counterB: document.getElementById("counterB"),
};


document.addEventListener('DOMContentLoaded', () => {
    frameLoop();
});

function frameLoop(){

    if (cal.readerA.pixelValue > 0) {
        if (cal.timesA < 5) {
            cal.valuesA.push(cal.readerA.pixelValue);
            cal.readerA.pixelValue = 0;
            cal.timesA += 1;
            
            if (cal.timesA == 1) {
                cal.counterA.innerHTML = `<span>${cal.timesA}</span>time`;
            }
            else if (cal.timesA == 5) {
                cal.counterA.innerHTML = `<span>Completed</span>`;
            }
            else {
                cal.counterA.innerHTML = `<span>${cal.timesA}</span>times`;
            }
        }
    }

    if (cal.readerB.pixelValue > 0) {
        if (cal.timesB < 5) {
            cal.valuesB.push(cal.readerB.pixelValue);
            cal.readerB.pixelValue = 0;
            cal.timesB += 1;
            
            if (cal.timesB == 1) {
                cal.counterB.innerHTML = `<span>${cal.timesB}</span>time`;
            }
            else if (cal.timesB == 5) {
                cal.counterB.innerHTML = `<span>Completed</span>`;
            }
            else {
                cal.counterB.innerHTML = `<span>${cal.timesB}</span>times`;
            }
        }

    }

    if (cal.timesA == 5 && cal.timesB == 5) {
        const sumA = cal.valuesA.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        const meanA = sumA / cal.valuesA.length;

        const sumB = cal.valuesB.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        const meanB = sumB / cal.valuesB.length;

        localStorage.setItem("minDistance", meanA);
        localStorage.setItem("maxDistance", meanB);

        window.location.href = "index.html";
    }
    else {
        requestAnimationFrame(()=>{
            frameLoop();
        });
    }

    
}