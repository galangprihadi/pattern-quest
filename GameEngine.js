////////////////////////////////////////////=========================
///////////////////////////////////////////       GAME ENGINE CLASS
//////////////////////////////////////////===========================

//==== Class Structure ====//
//                         //
//     GameEngine          //
//       |--> Reader       //
//       |--> Question     //
//                         //
//=========================//


class GameEngine {
    
    constructor(geData) {
        this.readerA = new Reader({
            markerMode: false,
            infoMode: true,
            patternPaths: geData.patternPaths,
        });

        this.readerB = new Reader({
            markerMode: false,
            infoMode: true,
            patternPaths: geData.patternPaths,
        });

        this.readerC = new Reader({
            markerMode: false,
            infoMode: true,
            patternPaths: geData.patternPaths,
        });

        this.question = new Question({
            numOfQuestions: geData.numOfQuestions,
            patternPaths: geData.patternPaths,
        });

        this.eGameOverPanel = document.querySelector(".layer-gameover");
        this.eTextScore = document.getElementById("text-score");
        this.eTextTime = document.getElementById("text-time");
        this.eScoreTeam = document.getElementById("score-team");
        this.eScoreA = document.getElementById("score-a");
        this.eScoreB = document.getElementById("score-b");
        this.eScoreC = document.getElementById("score-c");

        this.gameRunning = true;
    }

    gameLoop() {
        let playerAnswers = [this.readerA.TagId, this.readerB.TagId, this.readerC.TagId];
        playerAnswers = playerAnswers.sort(function(a, b){return a - b});

        this.eTextScore.textContent = `${this.question.combCode} | ${playerAnswers}`;
        this.eTextTime.textContent = this.question.currentQuestion;

        if (playerAnswers[0] > 0 && playerAnswers[1] > 0 && playerAnswers[2] > 0 ) {
            if (JSON.stringify(this.question.combCode) === JSON.stringify(playerAnswers)) {
                this.gameRunning = this.question.nextQuestion(true);
            }
            else {
                this.gameRunning = this.question.nextQuestion(false);
            }

            this.readerA.resetTag();
            this.readerB.resetTag();
            this.readerC.resetTag();
        }

        if (this.gameRunning) {
            requestAnimationFrame(()=>{
                this.gameLoop();
            });
        }
        else {
            this.eGameOverPanel.style.display = "flex";
        }
    }
}