export class VideoController {
  PauseResume = startStopVideo;
  ForwardVideo = moveVideoForward;
  ReverseVideo = moveVideoBack;
  ChangeSpeed = setSpeed;
  ToggleLoop = loopVideo;
}

async function injectAndRun(f, args, callback) {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript(
    {
      target: { tabId: tab.id },
      function: f,
      args: args,
    },
    callback
  );
}

function startStopVideo() {
  injectAndRun(() => {
    var video = document.getElementsByTagName("video")[0];
    video.paused ? video.play() : video.pause();
  });
}

function moveVideoForward() {
  injectAndRun(() => {
    var video = document.getElementsByTagName("video")[0];
    video.currentTime = video.currentTime + 5;
  });
}

function moveVideoBack() {
  injectAndRun(() => {
    var video = document.getElementsByTagName("video")[0];
    video.currentTime = video.currentTime - 5;
  });
}

function setSpeed() {
  injectAndRun(() => {
    var video = document.getElementsByTagName("video")[0];
    video.playbackRate = 0.5;
  });
}

function getCurrentTime() {
  var video = document.getElementsByTagName("video")[0];
  return video.currentTime;
}

function setCurrentTime(time) {
  var video = document.getElementsByTagName("video")[0];
  video.currentTime = time;
}

var startTime;
var stopTime;

async function loopVideo() {
  injectAndRun(getCurrentTime, null, (e) => {
    var currentTime = e[0].result;

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
  });
}

var checkLoop = setInterval(enforceLoop, 0.01);
async function enforceLoop() {
  injectAndRun(getCurrentTime, null, (e) => {
    var currentTime = e[0].result;

    if (startTime == null || stopTime == null) return;

    if (currentTime >= stopTime || currentTime < startTime) {
      injectAndRun(setCurrentTime, [startTime]);
    }
  });
}
