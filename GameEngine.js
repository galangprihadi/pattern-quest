
class GameEngine {
    constructor() {
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

        this.question = new Pattern();
        this.question.setQuestion();

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