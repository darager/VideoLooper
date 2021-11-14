console.log("feedback script loaded");

let func = async () => {
  const video = document.getElementsByTagName("video")[0];
  var vidHeight = video.offsetHeight;
  var vidWidth = video.offsetWidth;
  var rect = video.getBoundingClientRect();
  var xpos = rect.left;
  var ypos = rect.top;

  var div = document.createElement("div");
  div.className = "addedDiv"
  div.width = "140";
  div.height = "140";
  div.style.backgroundColor = "red";
  div.style.opacity = "50";
  div.style.position = "absolute";
  div.style.left = xpos + vidWidth / 2 - 50 + "px";
  div.style.top = ypos + vidHeight / 2 - 50 + "px";

  var text = document.createElement("p");
  text.innerHTML = "FEEDBACK POPUP TEST!";
  text.style.fontSize = "40";
  div.appendChild(text);

  document.body.appendChild(div);
  console.log("adding div to DOM");
};

chrome.runtime.onMessage.addListener(async (request, sender, response) => {
  func();
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
