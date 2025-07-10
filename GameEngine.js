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

        setTimeout(() => {
            //this.question.setQuestion();
        }, 1000);

        this.gameRunning = true;

        //this.gameLoop();
    }

    gameLoop() {
        const step = () => {

            this.checkAnswer();

            requestAnimationFrame(()=>{
                step();
            });
        }

        step();
    }

    calibrateTag(refValue){
        this.readerA.tagRef = refValue;
        this.readerB.tagRef = refValue;
        this.readerC.tagRef = refValue;
    }

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