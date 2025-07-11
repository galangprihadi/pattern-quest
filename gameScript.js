////////////////////////////////////////////=========================
///////////////////////////////////////////     GAME INITIALIZATION
//////////////////////////////////////////===========================

const game = new GameEngine({
    numOfQuestions: 3,
    patternPaths: [
        "images/patterns/patA1.png",
        "images/patterns/patA2.png",
        "images/patterns/patA3.png",
        "images/patterns/patA4.png",
        "images/patterns/patA5.png",
        "images/patterns/patA6.png",
        "images/patterns/patA7.png",
        "images/patterns/patA8.png",
        "images/patterns/patA9.png",
        "images/patterns/patA10.png",
        "images/patterns/patA11.png",
        "images/patterns/patA12.png"
    ]
});

//Start Game Panel
const layerStart = document.querySelector(".layer-start");


////////////////////////////////////////////=========================
///////////////////////////////////////////          MAIN FUNCTIONS
//////////////////////////////////////////===========================

document.addEventListener('DOMContentLoaded', () => {

    if (localStorage.getItem("minDistance") == null && localStorage.getItem("minDistance") == null) {
        const warningText = document.createElement("span");
        warningText.textContent = "You need to calibrate the Screen Tag first!";
        layerStart.prepend(warningText);

        btnStart.textContent = "CALIBRATE";
    }
});

// Button Start Game
const btnStart = document.getElementById("btnStart");
btnStart.addEventListener("click", ()=>{
    if (localStorage.getItem("minDistance") !== null && localStorage.getItem("minDistance") !== null) {

        // Hide Start Panel
        layerStart.style.display = "none";

        // Start Game (Game Loop)
        setTimeout(() => {
            game.gameLoop();
        }, 1000);
    }
    else {
        window.location.href = "calibration.html";
    }
});





/*


document.addEventListener("DOMContentLoaded", function() {

    // Calibration System
    //gameStartScanner(game);
});


//========================================================>> Start Game Panel + Calibration
function gameStartScanner(gameEngine) {
    const ePanel = document.querySelector(".layer-start");
    const eScanner = document.querySelector(".layer-start .scanner");

    eScanner.addEventListener("touchstart", (event) => {
        event.preventDefault();

        const touches = Array.from(event.touches).filter(touch => touch.target === eScanner);
        const touchPos = [];
        let maxDistance = 0;

        if (touches.length === 2) {
            for (let i=0; i < touches.length; i++) {
                // Read each tip
                const touch = touches[i];
                const touchId = touch.identifier;
                const x = touch.clientX - eScanner.getBoundingClientRect().left;
                const y = touch.clientY - eScanner.getBoundingClientRect().top;
                touchPos.push({x, y});
            }

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

        if (maxDistance > 0) {
            // Calibrate
            gameEngine.calibrateTag(maxDistance);

            // Hide Start Panel
            ePanel.style.display = "none";

            // Start Game (Game Loop)
            //gameEngine.gameLoop();
            setTimeout(() => {
                gameEngine.gameLoop();
            }, 1000);
            
            
        }
    });
}

*/