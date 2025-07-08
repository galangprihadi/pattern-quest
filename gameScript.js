//===========================
//    GAME INITIALIZATION
//===========================

document.addEventListener("DOMContentLoaded", function() {

    // Create Game Engine
    const game = new GameEngine({
        numOfQuestion: 10,
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


    // Calibration System
    gameStartScanner(game);
});


//========================================================>> Start Game Panel + Calibration
function gameStartScanner(gameEngine) {
    const ePanel = document.querySelector(".start-panel");
    const eScanner = document.querySelector(".start-panel .scanner");

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
        }
    });
}

function fullscreen() {
    // Fullscreen
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    }
    else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
    }
    else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
    }
    else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
    }
}