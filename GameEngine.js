
class GameEngine {
    constructor(geData) {
        this.readerA = new Reader({
            markerMode: true,
            infoMode: true,
        });

        this.readerB = new Reader({
            markerMode: true,
            infoMode: true,
        });

        this.readerC = new Reader({
            markerMode: true,
            infoMode: true,
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

            document.querySelector(".container-info").textContent = this.getAnswer();

            requestAnimationFrame(()=>{
                step();
            });
        }

        step();
    }

    getAnswer() {
        let answers = [this.readerA.TagId, this.readerB.TagId, this.readerC.TagId];
        answers = answers.sort(function(a, b){return a - b});

        return answers.join("");
    }
}