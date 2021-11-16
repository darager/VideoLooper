chrome.runtime.onMessage.addListener((request, sender, response) => {
  var cmd = { id: request.cmd };
  var video = document.getElementsByTagName("video")[0];

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

  var imgFile = null;

  switch (cmd.id) {
    case "play-pause":
      imgFile = video.paused ? "images/play.svg" : "images/pause.svg";
      break;
    case "move-video-forward":
      imgFile = "images/right-arrow.svg";
      break;
    case "move-video-back":
      imgFile = "images/left-arrow.svg";
      break;
    case "toggle-speed":
      console.log("Show current speed");
      break;
    case "increase-speed":
      console.log("Show current speed");
      break;
    case "decrease-speed":
      console.log("Show current speed");
      break;
    case "reset-speed":
      console.log("Show current speed");
      break;
    case "toggle-loop":
      console.log("Show loop state icon");
      break;
    case "set-loop-start":
      console.log("Show loop state icon");
      break;
    case "set-loop-end":
      console.log("Show loop state icon");
      break;
    case "remove-loop":
      imgFile = "images/breakloop.svg";
      break;
  }
  if (imgFile == null) return;

  var img = new Image();
  img.src = chrome.runtime.getURL(imgFile);
  img.width = "140";
  img.height = "140";

  div.appendChild(img);
  document.body.appendChild(div);

  setTimeout(() => {
    document.body.removeChild(div);
  }, 300);
});
