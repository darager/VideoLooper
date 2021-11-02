let changeColor = document.getElementById("changeColor");
let playpauseVideo = document.getElementById("playpauseVideo");

chrome.storage.sync.get("color", ({ color }) => {
  changeColor.style.backgroundColor = color;
});

playpauseVideo.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: startStopVideo,
  });
});

function startStopVideo() {
  var video = document.getElementsByTagName("video")[0];

  if(video.paused) {
    video.play();
  } else {
    video.pause();
  }
}