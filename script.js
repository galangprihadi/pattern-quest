////////////////////////////////////////////=========================
///////////////////////////////////////////       GENERAL FUNCTIONS
//////////////////////////////////////////===========================

//Fullscreen Button Function
const btnFullscreen = document.getElementById("btnFullscreen");
btnFullscreen.addEventListener("click", ()=>{
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


//Home Button Function
const btnHome = document.getElementById("btnHome");
btnHome.addEventListener("click", ()=>{
    window.location.href = "index.html";
});