// Globals
var fullscreenAvailable = false;
var btn01 = document.getElementById('btn-01');
var btn02 = document.getElementById('btn-02');

// Code modified from code found at:
//
// http://www.sitepoint.com/use-html5-full-screen-api/
//

// full-screen feature support text...
if(
    document.fullscreenEnabled ||
    document.webkitFullscreenEnabled ||
    document.mozFullScreenEnabled ||
    document.msFullscreenEnabled
){
    fullscreenAvailable = true;
}

// Event Listeners

// Enter fullscreen mode when btn01
// is clicked...
btn01.addEventListener('click', function(){

    if(fullscreenAvailable){
        launchFullscreen(document.documentElement);
    }else{
        alert('Sorry, fullscreen not available...');
    }

}, false);

// Exit fullscreen mode when btn02
// is clicked
/*
btn02.addEventListener('click', function(){

    exitFullscreen();

}, false);
*/


// Functions...

// Helper functions code modified from code
// found at the following website:
//
// http://davidwalsh.name/fullscreen
//
// Enter Fullscreen mode
function launchFullscreen(element) {

    if(document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    } else if(document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
    } else if(document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
    } else if(document.documentElement.msRequestFullscreen) {
        console.log("reuslt"+document.documentElement.msRequestFullscreen());
    }

    /*if(element.requestFullscreen) {
        element.requestFullscreen();
    } else if(element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if(element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if(element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }*/
}

// Exit Fullscreen mode
function exitFullscreen() {
    if(document.exitFullscreen) {
        document.exitFullscreen();
    } else if(document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if(document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}