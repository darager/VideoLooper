// if url changes set lastPlaybackRate
window.addEventListener("locationchange", setLastPlaybackRate);

setInterval(storeLastPlaybackRate, 500);

function setLastPlaybackRate() {
  var video = document.getElementsByTagName("video")[0];
  if (video == null) return;

  getPlaybackValues((values) => {
    if (values.forceLastPlaybackRate == false) return;
    if (values.lastPlaybackRate == null) return;

    console.log("setting default playback rate");
    video.playbackRate = values.lastPlaybackRate;
  });
}

function storeLastPlaybackRate() {
  var video = document.getElementsByTagName("video")[0];
  if (video == null) return;

  var curRate = video.playbackRate;
  if(curRate == null) return;

  getPlaybackValues((values) => {
    if (values.lastPlaybackRate == curRate) return;

    var message = {
      cmd: "storeValue",
      value: { key: "lastPlaybackRate", value: curRate },
    };
    chrome.runtime.sendMessage(values.extensionId, message);
  });
}

// TODO: only 1 getValue function for all content-scripts
function getPlaybackValues(callback) {
  let keys = ["lastPlaybackRate", "forceLastPlaybackRate", "extensionId"];
  chrome.storage.local.get(keys, (v) => callback(v));
}
