let buttonContainer = document.getElementById("buttonContainer");

buttonContainer.addEventListener("click", async (e) => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  let buttonId = e.target.id;
  let onClick = getButtonFunction(buttonId);

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: onClick
  });
});

function getButtonFunction(buttonId) {
  var onClick;
  switch (buttonId) {
    case "playpauseVideo": onClick = startStopVideo;
  }

  return onClick;
}

function startStopVideo() {
  var video = document.getElementsByTagName("video")[0];

  if(video.paused) {
    video.play();
  } else {
    video.pause();
  }
}