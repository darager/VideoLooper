function getVideo() {
  return document.getElementsByTagName("video")[0];
}

function getVideoState() {
  var video = getVideo();
  return {
    paused: video.paused,
    currentTime: video.currentTime,
    playbackRate: video.playbackRate,
    loop: { startTime: startTime, stopTime: stopTime },
  };
}

function setVideoState(state, video, setCurrentTime) {
  state.paused ? video.pause() : video.play();
  if (setCurrentTime) video.currentTime = state.currentTime;
  video.playbackRate = state.playbackRate;

  startTime = state.loop.startTime;
  stopTime = state.loop.stopTime;
}

var startTime;
var stopTime;

function getLoopState() {
  return { startTime: startTime, stopTime: stopTime };
}
