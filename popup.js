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
}


function openOptionsPage() {
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  } else {
    window.open(chrome.runtime.getURL('options.html'));
  }
}
