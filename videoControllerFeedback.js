console.log("feedback script loaded");

let func = async () => {
  const video = document.getElementsByTagName("video")[0];
  var vidHeight = video.offsetHeight;
  var vidWidth = video.offsetWidth;
  var rect = video.getBoundingClientRect();
  var xpos = rect.left;
  var ypos = rect.top;

  var div = document.createElement("div");
  div.width = "140";
  div.height = "140";
  div.style.backgroundColor = "red";
  div.style.position = "absolute";
  div.style.left = xpos + vidWidth / 2 - 50 + "px";
  div.style.top = ypos + vidHeight / 2 - 50 + "px";

  var img = new Image();
  img.src = await chrome.runtime.getURL("images/loop.svg");
  img.width = "140";
  img.height = "140";

  div.appendChild(img);
  document.body.appendChild(div);
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
