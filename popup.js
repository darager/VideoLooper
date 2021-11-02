document.getElementById("playpauseVideo").addEventListener("click", () => execute(startStopVideo));
document.getElementById("forwardVideo").addEventListener("click", () => execute(forwardVideo));
document.getElementById("slowVideo").addEventListener("click", () => execute(setSpeed));

async function execute(f) {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: f
  });
}

function startStopVideo() {
  var video = document.getElementsByTagName("video")[0];
  (video.paused) ? video.play() : video.pause();
}

function forwardVideo() {
  var video = document.getElementsByTagName("video")[0];
  video.currentTime = video.currentTime + 5;
}

function setSpeed() {
  var video = document.getElementsByTagName("video")[0];
  video.playbackRate = 0.5;
}