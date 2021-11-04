// "play-pause"
// "move-video-forward"
// "move-video-back"
// "toggle-speed"
// "increase-speed"
// "decrease-speed"
// "reset-speed"
// "toggle-loop"
// "set-loop-start"
// "set-loop-end"
// "remove-loop"

registerOnClickCommand("playpauseVideo", "play-pause");
registerOnClickCommand("forwardVideo", "move-video-forward");

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
