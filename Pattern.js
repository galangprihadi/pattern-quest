

class Pattern {
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

    pattPaths = [
        "images/patterns/patA1.png",
        "images/patterns/patA2.png",
        "images/patterns/patA3.png",
        "images/patterns/patA4.png",
        "images/patterns/patA5.png",
        "images/patterns/patA6.png",
        "images/patterns/patA7.png",
        "images/patterns/patA8.png",
        "images/patterns/patA9.png",
        "images/patterns/patA10.png",
        "images/patterns/patA11.png",
        "images/patterns/patA12.png",
    ];

    constructor() {
        this.shuffleQuestion();
        this.currentQuestion = 0;
        this.eQuestion = document.querySelector(".question");

        this.loadAllImages(this.pattPaths)
            .then(images => {
                this.pattImages = images;
            })
            .catch((error) => {

            });

        this.eQuestion.style.backgroundImage = `url(${this.pattImages[1].src})`;
    }

    

    loadAllImages(paths){
        const loadPromises = [];
        const loadedImages = {};

        paths.forEach((path, index) => {
            const img = new Image();

            const promise = new Promise((resolve, reject) => {
                img.onload = () => {
                    loadedImages[index+1] = img; 
                    console.log(`Gambar berhasil dimuat: ${path}`);
                    resolve();
                };
                img.onerror = () => {
                    reject(new Error(`Failed to load image: ${path}`)); 
                };
            });
        });

        return Promise.all(loadPromises).then(() => loadedImages);
    }

    shuffleQuestion() {
        for (let i=0; i < this.pattCode.length; i++) {
            const randomIndex = Math.floor(Math.random() * this.pattCode.length);
            const temp = this.pattCode[i];
            this.pattCode[i] = this.pattCode[randomIndex];
            this.pattCode[randomIndex] = temp;
        }
    }

    setQuestion() {
        this.eQuestion.style.backgroundImage = `url('${this.pattImage[0]}'), url('${this.pattImage[1]}'), url('${this.pattImage[2]}')`;
    }
}
