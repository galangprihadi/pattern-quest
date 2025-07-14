////////////////////////////////////////////=========================
///////////////////////////////////////////             SCORE CLASS
//////////////////////////////////////////===========================

//==== Class Structure ====//
//                         //
//     GameEngine          //
//       |--> Question     //
//       |--> Reader       //
//       |--> Score        //
//                         //
//=========================//


class Timer {
    constructor (sData) {
        this.duration = sData.duration;
        this.min = 0;
        this.sec = 0;
        this.timerText = "-";

        //this.startTimer();
    }

    startTimer() {
        this.timerDuration = this.duration;
        
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }
        this.timerInterval = setInterval(() => {
            this.timerDuration -= 1;
            this.min = parseInt(this.timerDuration / 60, 10);
            this.sec = parseInt(this.timerDuration % 60, 10);

            this.timerText = `${this.min < 10 ? "0" + this.min : this.min}:${this.sec < 10 ? "0" + this.sec : this.sec}`;

            if (this.timerDuration == 0) {
                clearInterval(this.timerInterval);
            }
        }, 1000);
    }

    getScore() {
        return Math.round(100 / this.duration * this.timerDuration);
    }
}