console.log("content-script loaded!");

// play-pause
// move-video-forward
// move-video-back
// toggle-speed
// increase-speed
// decrease-speed
// reset-speed
// toggle-loop
// set-loop-start
// set-loop-end
// remove-loop

chrome.runtime.onMessage.addListener((request, sender, response) => {
  var cmd = {id: request.cmd}
  console.log(cmd);

  if(cmd.id == "play-pause") {
    startStopVideo();
  }
});

function startStopVideo() {
  var video = document.getElementsByTagName("video")[0];
  video.paused ? video.play() : video.pause();
}

function moveVideoForward() {
  var video = document.getElementsByTagName("video")[0];
  video.currentTime = video.currentTime + 5;
}

function moveVideoBack() {
  var video = document.getElementsByTagName("video")[0];
  video.currentTime = video.currentTime - 5;
}

function setSpeed(speed) {
  var video = document.getElementsByTagName("video")[0];
  video.playbackRate = speed;
}

function getCurrentTime() {
  var video = document.getElementsByTagName("video")[0];
  var time = video.currentTime;
  return time;
}

function setCurrentTime(time) {
  var video = document.getElementsByTagName("video")[0];
  video.currentTime = time;
}

var startTime;
var stopTime;

async function loopVideo() {
  var currentTime = getCurrentTime();

  if (startTime != null && stopTime != null) {
    startTime = null;
    stopTime = null;
  } else if (startTime == null && stopTime == null) {
    startTime = currentTime;
  } else if (startTime != null && stopTime == null) {
    stopTime = currentTime;

    if (stopTime <= startTime) {
      startTime = null;
      stopTime = null;
    }
  }
}

var checkLoop = setInterval(enforceLoop, 0.01);
async function enforceLoop() {
  var currentTime = getCurrentTime();

  if (startTime == null || stopTime == null) return;

  if (currentTime >= stopTime || currentTime < startTime) {
    setCurrentTime(startTime);
  }
}
