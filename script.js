////////////////////////////////////////////=========================
///////////////////////////////////////////       GENERAL FUNCTIONS
//////////////////////////////////////////===========================

// Fullscreen Button Function
const btnFullscreen = document.getElementById("btnFullscreen");
if (btnFullscreen) btnFullscreen.addEventListener("click", ()=>{

    audioPlayer("button");

    if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement) {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }

        btnFullscreen.innerHTML = `<i class="fa-solid fa-expand"></i>`;
    }
    else {
        const eHtml = document.documentElement;

        if (eHtml.requestFullscreen) {
            eHtml.requestFullscreen();
        } else if (eHtml.webkitRequestFullscreen) {
            eHtml.webkitRequestFullscreen();
        } else if (eHtml.mozRequestFullScreen) {
            eHtml.mozRequestFullScreen();
        } else if (eHtml.msRequestFullscreen) {
            eHtml.msRequestFullscreen();
        }

        btnFullscreen.innerHTML = `<i class="fa-solid fa-compress"></i>`;
    }
});


// Home Button Function
const btnHome = document.getElementById("btnHome");
if (btnHome) btnHome.addEventListener("click", ()=>{
    audioPlayer("button");

    setTimeout(() => {
        window.location.href = "index.html";
    }, 500);
});


// Load Page Function
function loadPage(destination) {
    audioPlayer("button");

    setTimeout(() => {
        window.location.href = destination;
    }, 500);
}

// Sounds Function
const soundButton = document.getElementById("soundButton");
const soundTag = document.getElementById("soundTag");
const soundBg = document.getElementById("soundBg");
const soundCorrect = document.getElementById("soundCorrect");
const soundFail = document.getElementById("soundFail");

function audioPlayer(soundId) {
    if (soundId == "button" && soundButton) {
        soundButton.currentTime = 0;
        soundButton.play();
    }
    else if (soundId == "tag" && soundTag) {
        soundTag.currentTime = 0;
        soundTag.play();
    }
    else if (soundId == "bgStart" && soundBg) {
        soundBg.currentTime = 0;
        soundBg.play();
    }
    else if (soundId == "bgStop" && soundBg) {
        soundBg.pause();
    }
    else if (soundId == "correct" && soundCorrect && soundBg) {
        soundCorrect.currentTime = 0;
        soundCorrect.play();
    }
    else if (soundId == "fail" && soundFail && soundBg) {
        soundFail.currentTime = 0;
        soundFail.play();
    }
}