////////////////////////////////////////////===============================
///////////////////////////////////////////    CALIBRATION INITIALIZATION
//////////////////////////////////////////=================================


const cal = {
    readerA: new Reader({
        markerMode: true,
        infoMode: true,
        calibrationMode: true,
        patternPaths: ["images/patterns/patA1.png"]
    }),
    readerB: new Reader({
        markerMode: true,
        infoMode: true,
        calibrationMode: true,
        patternPaths: ["images/patterns/patA12.png"]
    })
};