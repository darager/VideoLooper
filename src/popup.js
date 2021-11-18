registerOnClickCommand("forwardVideo", "move-video-forward");
registerOnClickCommand("playpauseVideo", "play-pause");
registerOnClickCommand("rewindVideo", "move-video-back");
registerOnClickCommand("decreaseSpeed", "decrease-speed");
registerOnClickCommand("increaseSpeed", "increase-speed");
registerOnClickCommand("resetSpeed", "reset-speed");
registerOnClickCommand("toggleLoop", "toggle-loop");
registerOnClickCommand("setLoopStart", "set-loop-start");
registerOnClickCommand("removeLoop", "remove-loop");
registerOnClickCommand("setLoopEnd", "set-loop-end");

document
  .getElementById("openOptions")
  .addEventListener("click", openOptionsPage);

var speedDisplay = document.getElementById("speed");
var playPauseButton = document.getElementById("playpauseVideo");
var toggleLoopButton = document.getElementById("toggleLoop");

sendCommand("", updateUi);

function registerOnClickCommand(elementId, command) {
  document
    .getElementById(elementId)
    .addEventListener("click", () => sendCommand(command, updateUi));
}

function sendCommand(command, callback) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var activeTab = tabs[0].id
    var message = { cmd: command,  };
    chrome.tabs.sendMessage(activeTab, message, callback);
  });
}

function updateUi(videoState) {
  speedDisplay.textContent = videoState.playbackRate;
  playPauseButton.src = (videoState.paused) ? "../images/play.svg" : "../images/pause.svg";

  var image = "../images/inactiveloop.svg";
  let loop = videoState.loop;
  if(loop.startTime != null && loop.stopTime == null) image = "../images/loopwithstart.svg";
  if(loop.startTime != null && loop.stopTime != null) image = "../images/loop.svg";
  toggleLoopButton.src = image;
}


function openOptionsPage() {
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  } else {
    window.open(chrome.runtime.getURL('options.html'));
  }
}
