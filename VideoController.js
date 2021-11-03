async function execute(f, args, callback) {
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

export function startStopVideo() {
  execute(() => {
    var video = document.getElementsByTagName("video")[0];
    video.paused ? video.play() : video.pause();
  })
}

export function moveVideoForward() {
  execute(() => {
    var video = document.getElementsByTagName("video")[0];
    video.currentTime = video.currentTime + 5;
  })
}

export function moveVideoBack() {
  execute(() => {
    var video = document.getElementsByTagName("video")[0];
    video.currentTime = video.currentTime - 5;
  })
}

export function setSpeed() {
  execute(() => {
    var video = document.getElementsByTagName("video")[0];
    video.playbackRate = 0.5;
  })
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

export async function loopVideo() {
  execute(getCurrentTime, null, (e) => {
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
  execute(getCurrentTime, null, (e) => {
    var currentTime = e[0].result;

    if (startTime == null || stopTime == null) return;

    if (currentTime >= stopTime || currentTime < startTime) {
      execute(setCurrentTime, [startTime]);
    }
  });
}