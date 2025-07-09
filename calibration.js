
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