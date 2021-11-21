const iconHeight = 100;
const iconWidth = 100;
const popupHeight = iconHeight + 40;
const popupWidth = iconWidth + 40;

chrome.runtime.onMessage.addListener((request, sender, response) => {
  var cmd = { id: request.cmd };

  withVideoState((videoState) => {
    var popup = null;

    switch (cmd.id) {
      case "play-pause":
        popup = imagePopup(
          videoState.paused ? "../images/pause.svg" : "../images/play.svg",
          60,
          60
        );
        break;
      case "move-video-forward":
        popup = imagePopup("../images/right-arrow.svg", 60, 60);
        break;
      case "move-video-back":
        popup = imagePopup("../images/left-arrow.svg", 60, 60);
        break;
      case "toggle-speed":
      case "increase-speed":
      case "decrease-speed":
      case "reset-speed":
        popup = textPopup(Number(videoState.playbackRate).toFixed(1));
        break;
      case "toggle-loop":
      case "set-loop-start":
      case "set-loop-end":
        let img = getLoopStateImage(videoState.loop);
        popup = imagePopup(img);
        break;
      case "remove-loop":
        popup = imagePopup("../images/breakloop_black.svg");
        break;
    }

    if (popup == null) return;

    document.body.appendChild(popup);

    setTimeout(() => {
      document.body.removeChild(popup);
    }, 300);
  });
});

function getLoopStateImage(loop) {
  if (loop.startTime == null && loop.stopTime == null) {
    return "../images/breakloop_black.svg";
  } else if (loop.startTime != null && loop.stopTime == null) {
    return "../images/loopwithstart.svg";
  } else if (loop.startTime != null && loop.stopTime != null) {
    return "../images/loop.svg";
  }
}

function textPopup(text) {
  var container = popupContainer();

  var h1 = document.createElement("h1");
  h1.textContent = text;
  h1.style.fontSize = "60px";
  h1.style.fontFamily = "verdana";

  container.appendChild(h1);
  return container;
}

function imagePopup(imagePath, width = 100, height = 100) {
  var container = popupContainer();

  var img = new Image();
  img.src = chrome.runtime.getURL(imagePath);
  img.width = width;
  img.height = height;

  container.appendChild(img);
  return container;
}

function popupContainer() {
  var div = document.createElement("div");
  div.width = popupWidth;
  div.height = popupHeight;
  div.style.minWidth = popupWidth + "px";
  div.style.minHeight = popupHeight + "px";
  div.style.padding = "20px";
  div.style.borderRadius = "50px";
  div.style.backgroundColor = "#828282";
  div.style.opacity = "0.8";
  div.style.display = "flex";
  div.style.alignItems = "center";
  div.style.justifyContent = "center";
  centerOnVideo(div);

  return div;
}

function centerOnVideo(element) {
  var vid = video.getVideoDomElement();
  centerInHost(element, vid);
}

function centerInHost(element, host) {
  var vidHeight = host.offsetHeight;
  var vidWidth = host.offsetWidth;
  var rect = host.getBoundingClientRect();
  var xpos = rect.left;
  var ypos = rect.top;

  element.style.position = "absolute";
  element.style.left = xpos + vidWidth / 2 - element.width / 2 + "px";
  element.style.top = ypos + vidHeight / 2 - element.height / 2 + "px";
}

function withVideoState(f) {
  // ugly workaround :)
  setTimeout(() => {
    f(video.getVideoState());
  }, 80);
}
