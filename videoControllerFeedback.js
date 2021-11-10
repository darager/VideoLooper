console.log("feedback script loaded");

chrome.runtime.onMessage.addListener((request, sender, response) => {
  var cmd = { id: request.cmd };
  var video = document.getElementsByTagName("video")[0];

  console.log(cmd);

  switch (cmd.id) {
    case "play-pause":
      break;
    case "move-video-forward":
      break;
    case "move-video-back":
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
