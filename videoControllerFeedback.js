chrome.runtime.onMessage.addListener((request, sender, response) => {
  var cmd = { id: request.cmd };

  withVideoState((videoState) => {
    var popup = null;

    switch (cmd.id) {
      case "play-pause":
        popup = imagePopup(videoState.paused ? "images/pause.svg" : "images/play.svg", 60, 60);
        break;
      case "move-video-forward":
        popup = imagePopup("images/right-arrow.svg", 60, 60);
        break;
      case "move-video-back":
        popup = imagePopup("images/left-arrow.svg", 60, 60);
        break;
      case "toggle-speed":
      case "increase-speed":
      case "decrease-speed":
      case "reset-speed":
        popup = textPopup(videoState.playbackRate);
        break;
      case "toggle-loop":
      case "set-loop-start":
      case "set-loop-end":
        let img = getLoopStateImage(videoState.loop);
        popup = imagePopup(img);
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

function getLoopStateImage(loop) {
  if (loop.startTime == null && loop.stopTime == null) {
    return "images/breakloop.svg";
  } else if (loop.startTime != null && loop.stopTime == null) {
    return "images/loopwithstart.svg";
  } else if (loop.startTime != null && loop.stopTime != null) {
    return "images/loop.svg";
  }
}

const iconHeight = 100;
const iconWidth = 100;
const popupHeight = iconHeight + 40;
const popupWidth = iconWidth + 40;

function textPopup(text) {
  var container = popupContainer();

  var p = document.createElement("h1");
  p.textContent = text;
  p.width = iconWidth;
  p.height= iconHeight;
  p.style.fontSize = 20;

  container.appendChild(p);
  return container;
}

function imagePopup(imagePath, width = 100, height = 100) {
  var container = popupContainer();

  var img = new Image();
  img.src = chrome.runtime.getURL(imagePath);
  img.width = width;
  img.height = height;
  img.style.justifyContent = "center";

  setPopupChildMargin(img, width, height);

  container.appendChild(img);
  return container;
}

function popupContainer() {
  var video = document.getElementsByTagName("video")[0];

  var div = document.createElement("div");
  div.width = popupWidth;
  div.height = popupHeight;
  div.style.padding = "20px";
  div.style.borderRadius = "50px";
  div.style.backgroundColor = "#828282";
  div.style.opacity = "0.8";
  centerInHost(div, video);

  return div;
}

function setPopupChildMargin(child, width, height) {
  if(width != iconWidth || height != iconHeight) {
    var verticalMargin = (iconHeight - height) / 2 + "px";
    child.style.marginTop = verticalMargin;
    child.style.marginBottom = verticalMargin;

    var horizontalMargin = (iconWidth - width) / 2 + "px";
    child.style.marginLeft = horizontalMargin;
    child.style.marginRight = horizontalMargin;
  }
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
    f(getCurrentVideoState());
  }, 80);
}
