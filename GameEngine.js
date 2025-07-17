////////////////////////////////////////////=========================
///////////////////////////////////////////       GAME ENGINE CLASS
//////////////////////////////////////////===========================

//==== Class Structure ====//
//                         //
//     GameEngine          //
//       |--> Question     //
//       |--> Reader       //
//       |--> Timer        //
//                         //
//=========================//


class GameEngine {

    // Configuration
    stageDelay = 1000;      // in miliseconds
    
    constructor(geData) {
        // Question
        this.question = new Question({
            stageDelay: this.stageDelay,
            numOfQuestions: geData.numOfQuestions,
            patternPaths: geData.patternPaths,
        });

        // Screen Tag Readers
        this.readerA = new Reader({
            stageDelay: this.stageDelay,
            scoreMode: true,
            markerMode: false,
            infoMode: false,
            patternPaths: geData.patternPaths,
        });

        this.readerB = new Reader({
            stageDelay: this.stageDelay,
            scoreMode: true,
            markerMode: false,
            infoMode: false,
            patternPaths: geData.patternPaths,
        });

        this.readerC = new Reader({
            stageDelay: this.stageDelay,
            scoreMode: true,
            markerMode: false,
            infoMode: false,
            patternPaths: geData.patternPaths,
        });

        // Timer
        this.timer = new Timer({
            duration: geData.duration,
        });

        this.eGameOverPanel = document.querySelector(".layer-gameover");
        this.eTextScore = document.getElementById("text-score");
        this.eTextTime = document.getElementById("text-time");
        this.eScoreTeam = document.getElementById("score-team");
        this.eScoreA = document.getElementById("score-a");
        this.eScoreB = document.getElementById("score-b");
        this.eScoreC = document.getElementById("score-c");

        this.numOfQuestions = geData.numOfQuestions;
        this.duration = geData.duration;
    }

    startGame() {
        this.teamScore = 0;
        this.readerA.score = 0;
        this.readerB.score = 0;
        this.readerC.score = 0;

        setTimeout(() => {
            this.resetLevel();
            this.gameRunning = true;
            this.gameLoop();
        }, 1000);
    }

    resetLevel() {
        this.curAnswer = [0, 0, 0];
        this.tempScore = [0, 0, 0];

        this.readerA.resetLevel();
        this.readerB.resetLevel();
        this.readerC.resetLevel();

        this.timer.startTimer();
    }

    gameLoop() {

        if (this.gameRunning) {
            // Player A
            if (this.curAnswer[0] != this.readerA.TagId) {
                this.curAnswer[0] = this.readerA.TagId;
                this.tempScore[0] = this.timer.getScore();
            }

            // Player B
            if (this.curAnswer[1] != this.readerB.TagId) {
                this.curAnswer[1] = this.readerB.TagId;
                this.tempScore[1] = this.timer.getScore();
            }

            // Player C
            if (this.curAnswer[2] != this.readerC.TagId) {
                this.curAnswer[2] = this.readerC.TagId;
                this.tempScore[2] = this.timer.getScore();
            }

            // Check answers
            let playerAnswers = [this.readerA.TagId, this.readerB.TagId, this.readerC.TagId];
            playerAnswers = playerAnswers.sort(function(a, b){return a - b});

            if ((playerAnswers[0] > 0 && playerAnswers[1] > 0 && playerAnswers[2] > 0) || this.timer.timerDuration <= 0) {
                if (JSON.stringify(this.question.combCode) === JSON.stringify(playerAnswers)) {

                    audioPlayer("correct");

                    this.teamScore += this.timer.getScore();
                    this.readerA.updateScore(this.tempScore[0]);
                    this.readerB.updateScore(this.tempScore[1]);
                    this.readerC.updateScore(this.tempScore[2]);

                    this.gameRunning = this.question.nextQuestion(true);
                }
                else {

                    audioPlayer("fail");

                    // Player A checking
                    if (this.readerA.TagId == this.question.combCode[0] || this.readerA.TagId == this.question.combCode[1] || this.readerA.TagId == this.question.combCode[2]) {
                        this.readerA.updateScore(this.tempScore[0]);
                    }

                    // Player B checking
                    if (this.readerB.TagId == this.question.combCode[0] || this.readerB.TagId == this.question.combCode[1] || this.readerB.TagId == this.question.combCode[2]) {
                        this.readerB.updateScore(this.tempScore[1]);
                    }

                    // Player C checking
                    if (this.readerC.TagId == this.question.combCode[0] || this.readerC.TagId == this.question.combCode[1] || this.readerC.TagId == this.question.combCode[2]) {
                        this.readerC.updateScore(this.tempScore[2]);
                    }

                    this.gameRunning = this.question.nextQuestion(false);
                }

                this.resetLevel();
            }
        }

        // Information panel updates
        this.eTextScore.textContent = this.teamScore;
        this.eTextTime.textContent = this.timer.timerText;

        // Loop Check
        if (this.gameRunning) {
            requestAnimationFrame(()=>{
                this.gameLoop();
            });
        }
        else {
            setTimeout(() => {
                audioPlayer("bgStop");

                // Game Over
                this.eTextScore.textContent = "-";
                this.eTextTime.textContent = "-";
                this.eGameOverPanel.style.display = "flex";

                this.eScoreTeam.innerHTML = this.toStar(this.teamScore);
                this.eScoreA.innerHTML = this.toStar(this.readerA.score);
                this.eScoreB.innerHTML = this.toStar(this.readerB.score);
                this.eScoreC.innerHTML = this.toStar(this.readerC.score);
            }, this.stageDelay);
            
        }
    }

    toStar(score) {
        const maxStar = 5;
        const extraScore = 50;

        const convertedScore = (score + extraScore) / this.numOfQuestions / (100 / maxStar);

        const fullStar = Math.floor(convertedScore);
        const halfStar = convertedScore % 1;

        let stars = "";

        for (let i=0; i < fullStar; i++) {
            stars += `<i class="fa-solid fa-star"></i>`;
        }

        if (halfStar > 0.5) {
            stars += `<i class="fa-solid fa-star-half"></i>`;
        }
        
        return stars;
    }
}