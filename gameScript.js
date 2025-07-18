////////////////////////////////////////////=========================
///////////////////////////////////////////     GAME INITIALIZATION
//////////////////////////////////////////===========================

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
btnStart.addEventListener("click", () => {
    audioPlayer("button");

    animate (btnStart, {
        scale: [1, 1.1, 0.9, 1.1, 1],
        duration: 500,
    });
    
    if (localStorage.getItem("minDistance") !== null && localStorage.getItem("minDistance") !== null) {
        setTimeout(() => {
            // Hide Start Panel
            layerStart.style.display = "none";

            // Start Game
            game.startGame();

            // Play BGM
            audioPlayer("bgStart");
        }, 500);

    }
    else {
        setTimeout(() => {
            window.location.href = "calibration.html";
        }, 500);
        
    }
});

// Button Play Again
const btnPlayAgain = document.getElementById("btnPlayAgain");
btnPlayAgain.addEventListener("click", () => {

    audioPlayer("button");

    animate (btnStart, {
        scale: [1, 1.1, 0.9, 1.1, 1],
        duration: 500,
    });

    setTimeout(() => {
        game.question.reload();
        game.gameRunning = true;
        layerStart.style.display = "flex";
        game.eGameOverPanel.style.display = "none";
    }, 500);
    
});