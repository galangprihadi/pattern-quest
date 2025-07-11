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

        this.textScore = document.getElementById("text-score");
        this.textTime = document.getElementById("text-time");

        this.gameRunning = true;



        //this.gameLoop();

        /*
        setTimeout(() => {
            //this.question.setQuestion();
        }, 1000);

        this.gameRunning = true;

        //this.gameLoop();
        */
    }

    gameLoop() {
        let playerAnswers = [this.readerA.TagId, this.readerB.TagId, this.readerC.TagId];
        playerAnswers = playerAnswers.sort(function(a, b){return a - b});

        this.textScore.textContent = `${this.question.combCode} | ${playerAnswers}`;
        this.textTime.textContent = this.question.currentQuestion;

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

        //this.checkAnswer();

        if (this.gameRunning) {
            requestAnimationFrame(()=>{
                this.gameLoop();
            });
        }
        else {
            this.textScore.textContent = "Game Over";
        }

        /*
        const step = () => {

            this.checkAnswer();

            requestAnimationFrame(()=>{
                step();
            });
        }

        step();
        */
    }

    /*
    calibrateTag(refValue){
        this.readerA.tagRef = refValue;
        this.readerB.tagRef = refValue;
        this.readerC.tagRef = refValue;
    }
    */

    checkAnswer() {
        let answers = [this.readerA.TagId, this.readerB.TagId, this.readerC.TagId];
        answers = answers.sort(function(a, b){return a - b});

        document.getElementById("text-score").textContent = `${this.question.combCode} | ${answers}`;

        if (answers[0] > 0 && answers[1] > 0 && answers[2] > 0 ) {
            if (JSON.stringify(this.question.combCode) === JSON.stringify(answers)) {
                this.question.nextQuestion(true);
                
            }
            else {
                this.question.nextQuestion(false);
            }

            this.readerA.resetTag();
            this.readerB.resetTag();
            this.readerC.resetTag();
        }
        
    }

    getAnswer() {
        let answers = [this.readerA.TagId, this.readerB.TagId, this.readerC.TagId];
        answers = answers.sort(function(a, b){return a - b});

        return answers.join("");
    }
}