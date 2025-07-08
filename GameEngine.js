
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
            numOfQuestion: geData.numOfQuestion,
            patternPaths: geData.patternPaths,
        });

        setTimeout(() => {
            //this.question.setQuestion();
        }, 1000);

        this.gameLoop();
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

        if (JSON.stringify(this.question.combCode) === JSON.stringify(answers)) {
            document.querySelector(".container-info").textContent = "Correct";
        }
        else {
            document.querySelector(".container-info").textContent = `${this.question.combCode} | ${answers}`;
        }
    }

    getAnswer() {
        let answers = [this.readerA.TagId, this.readerB.TagId, this.readerC.TagId];
        answers = answers.sort(function(a, b){return a - b});

        return answers.join("");
    }
}