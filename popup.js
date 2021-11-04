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

function registerOnClickCommand(elementId, command) {
  document
    .getElementById(elementId)
    .addEventListener("click", () => sendCommand(command));
}

function sendCommand(command) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var activeTab = tabs[0].id
    var message = { cmd: command };
    chrome.tabs.sendMessage(activeTab, message);
  });
}
