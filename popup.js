document
  .getElementById("playpauseVideo")
  .addEventListener("click", () => sendCommand("play-pause"));
document
  .getElementById("forwardVideo")
  .addEventListener("click", () => sendCommand("move-video-forward"));
// document
//   .getElementById("backVideo")
//   .addEventListener("click", controller.ReverseVideo);
// document
//   .getElementById("slowVideo")
//   .addEventListener("click", () => controller.ChangeSpeed(0.5));
// document
//   .getElementById("loop")
//   .addEventListener("click", controller.ToggleLoop);

function sendCommand(command) {
  console.log("send from popup: ", command);
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var activeTab = tabs[0].id
    var message = { cmd: command };
    chrome.tabs.sendMessage(activeTab, message);
  });
}
