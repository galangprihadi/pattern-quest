////////////////////////////////////////////=========================
///////////////////////////////////////////       GENERAL FUNCTIONS
//////////////////////////////////////////===========================

function fullscreen() {
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
    }
}