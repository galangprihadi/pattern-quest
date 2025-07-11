////////////////////////////////////////////=========================
///////////////////////////////////////////          QUESTION CLASS
//////////////////////////////////////////===========================

//==== Class Structure ====//
//                         //
//     GameEngine          //
//       |--> Reader       //
//       |--> Question     //
//                         //
//=========================//


class Question {
    
    pattCode = [
        [1, 5, 9], [1, 5, 10], [1, 5, 11], [1, 5, 12], [1, 6, 9], [1, 6, 10], [1, 6, 11], [1, 6, 12], 
        [1, 7, 9], [1, 7, 10], [1, 7, 11], [1, 7, 12], [1, 8, 9], [1, 8, 10], [1, 8, 11], [1, 8, 12],
        [2, 5, 9], [2, 5, 10], [2, 5, 11], [2, 5, 12], [2, 6, 9], [2, 6, 10], [2, 6, 11], [2, 6, 12], 
        [2, 7, 9], [2, 7, 10], [2, 7, 11], [2, 7, 12], [2, 8, 9], [2, 8, 10], [2, 8, 11], [2, 8, 12],
        [3, 5, 9], [3, 5, 10], [3, 5, 11], [3, 5, 12], [3, 6, 9], [3, 6, 10], [3, 6, 11], [3, 6, 12], 
        [3, 7, 9], [3, 7, 10], [3, 7, 11], [3, 7, 12], [3, 8, 9], [3, 8, 10], [3, 8, 11], [3, 8, 12],
        [4, 5, 9], [4, 5, 10], [4, 5, 11], [4, 5, 12], [4, 6, 9], [4, 6, 10], [4, 6, 11], [4, 6, 12], 
        [4, 7, 9], [4, 7, 10], [4, 7, 11], [4, 7, 12], [4, 8, 9], [4, 8, 10], [4, 8, 11], [4, 8, 12],
    ];

    constructor(qData) {
        this.numOfQuestions = qData.numOfQuestions;
        this.pattPaths = qData.patternPaths;

        this.currentQuestion = 1;
        this.eQuestion = document.getElementById("question");
        this.pattImages = {};

        this.initializePatterns();
    }

    async initializePatterns() {
        try {
            this.shuffleQuestions();
            const images = await this.loadAllImages(this.pattPaths);
            this.pattImages = images;
            this.setQuestion();
        } 
        catch (error) {
            console.log("initializePatterns error : ");
        }
    }

    loadAllImages(paths) {
        const loadPromises = [];
        const loadedImages = {};

        paths.forEach((path, index) => {
            const img = new Image();

            const promise = new Promise((resolve, reject) => {
                img.onload = () => {
                    loadedImages[index + 1] = img; 
                    resolve();
                };
                img.onerror = () => {
                    reject(new Error(`Failed to load image: ${path}`)); 
                };
            });

            img.src = path;
            loadPromises.push(promise);
        });

        return Promise.all(loadPromises).then(() => loadedImages);
    }

    shuffleQuestions() {
        for (let i=0; i < this.pattCode.length; i++) {
            const randomIndex = Math.floor(Math.random() * this.pattCode.length);
            const temp = this.pattCode[i];
            this.pattCode[i] = this.pattCode[randomIndex];
            this.pattCode[randomIndex] = temp;
        }
    }

    setQuestion() {
        this.combCode = this.pattCode[this.currentQuestion];

        const img1 = this.pattImages[this.combCode[0]];
        const img2 = this.pattImages[this.combCode[1]];
        const img3 = this.pattImages[this.combCode[2]];

        if (img1 && img2 && img3) {
            this.eQuestion.style.backgroundImage = `url("${img1.src}"), url("${img2.src}"), url("${img3.src}")`
        }
        
    }

    nextQuestion(isCorrect) {
        if (isCorrect) {
            this.eQuestion.style.backgroundColor = "var(--color-correct)";
        }
        else {
            this.eQuestion.style.backgroundColor = "var(--color-incorrect)";
        }

        this.currentQuestion += 1;
        
        if (this.currentQuestion <= this.numOfQuestions) {
            setTimeout(() => {
                this.eQuestion.removeAttribute("style");
                this.setQuestion();
            }, 1000);
            
            return true;
        }
        else {
            return false;
        }

        /*
        if (this.currentQuestion < this.numOfQuestions) {
            if (isCorrect) {
                this.eQuestion.style.backgroundColor = "var(--color-correct)";
            }
            else {
                this.eQuestion.style.backgroundColor = "var(--color-incorrect)";
            }
            
            setTimeout(() => {
                this.currentQuestion += 1;
                this.eQuestion.removeAttribute("style");
                this.setQuestion();
            }, 1000);

            return true;
        }
        else {
            return false;
        }

        */
    }
}
