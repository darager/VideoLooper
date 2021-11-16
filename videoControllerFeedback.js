chrome.runtime.onMessage.addListener((request, sender, response) => {
  var cmd = { id: request.cmd };

  withVideoState((videoState) => {
    console.log(videoState);
    var popup = null;

    switch (cmd.id) {
      case "play-pause":
        popup = imagePopup(videoState.paused ? "images/pause.svg" : "images/play.svg");
        break;
      case "move-video-forward":
        popup = imagePopup("images/right-arrow.svg");
        break;
      case "move-video-back":
        popup = imagePopup("images/left-arrow.svg");
        break;
      case "toggle-speed":
        popup = textPopup(videoState.playbackRate)
        break;
      case "increase-speed":
        popup = textPopup(videoState.playbackRate)
        break;
      case "decrease-speed":
        popup = textPopup(videoState.playbackRate)
        break;
      case "reset-speed":
        popup = textPopup(videoState.playbackRate)
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
        popup = imagePopup("images/breakloop.svg");
        break;
    }

    if (popup == null) return;

    document.body.appendChild(popup);
    setTimeout(() => {
      document.body.removeChild(popup);
    }, 300);
  });
});

function textPopup(text) {
  var container = popupContainer();

  var p = document.createElement("h1");
  p.textContent = text;
  p.style.fontSize = 20;

  container.appendChild(p);
  return container;
}

function imagePopup(imagePath) {
  var container = popupContainer();

  var img = new Image();
  img.src = chrome.runtime.getURL(imagePath);
  img.width = "140";
  img.height = "140";

  container.appendChild(img);
  return container;
}

function popupContainer() {
  var video = document.getElementsByTagName("video")[0];

  var div = document.createElement("div");
  div.width = "140";
  div.height = "140";
  div.style.backgroundColor = "red";
  centerInHost(div, video);

  return div;
}

function centerInHost(element, host) {
  var vidHeight = host.offsetHeight;
  var vidWidth = host.offsetWidth;
  var rect = host.getBoundingClientRect();
  var xpos = rect.left;
  var ypos = rect.top;

  element.style.position = "absolute";
  element.style.left = xpos + vidWidth / 2 - (element.width / 2) + "px";
  element.style.top = ypos + vidHeight / 2 - (element.height / 2) + "px";
}

function withVideoState(f) {
  // ugly workaround :)
  setTimeout(() => {
    f(getCurrentVideoState());
  }, 80);
}
