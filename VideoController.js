console.log("content-script loaded!");

chrome.runtime.onMessage.addListener((request, sender, response) => {
  var cmd = { id: request.cmd };
  console.log(cmd);

  switch (cmd.id) {
    case "play-pause":
      startStopVideo();
      break;
    case "move-video-forward":
      moveVideoForward();
      break;
    case "move-video-back":
      moveVideoBack();
      break;
    case "toggle-speed":
      break;
    case "increase-speed":
      break;
    case "decrease-speed":
      break;
    case "reset-speed":
      break;
    case "toggle-loop":
      break;
    case "set-loop-start":
      break;
    case "set-loop-end":
      break;
    case "remove-loop":
      break;
  }
});

function startStopVideo() {
  var video = document.getElementsByTagName("video")[0];
  video.paused ? video.play() : video.pause();
}

function moveVideoForward() {
  forwardVideo(5);
}
function moveVideoBack() {
  forwardVideo(-5);
}
function forwardVideo(seconds) {
  var video = document.getElementsByTagName("video")[0];
  video.currentTime = video.currentTime + seconds;
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
