document.onload(() => {
  chrome.storage.local.get("lastPlaybackRate", (s) => {
    var video = document.getElementsByTagName("video")[0];
    if (video == null) return;

    video.playbackRate = s;
  });
});

setInterval(() => {
  var video = document.getElementsByTagName("video")[0];
  if (video == null) return;

  chrome.storage.local.set({ lastPlaybackRate: video.playbackRate });
}, 100);
