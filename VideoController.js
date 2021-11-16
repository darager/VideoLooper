chrome.runtime.onMessage.addListener((request, sender, response) => {
  var cmd = { id: request.cmd };
  var video = document.getElementsByTagName("video")[0];
  var videoState = {
    paused: video.paused,
    currentTime: video.currentTime,
    playbackRate: video.playbackRate,
    loop: { startTime: startTime, stopTime: stopTime },
  };

  getValues((data) => {
    var currentTimeChanged = false;
    switch (cmd.id) {
      case "play-pause":
        videoState.paused = !videoState.paused;
        break;
      case "move-video-forward":
        videoState.currentTime += data.moveVideoBy;
        currentTimeChanged = true;
        break;
      case "move-video-back":
        videoState.currentTime -= data.moveVideoBy;
        currentTimeChanged = true;
        break;
      case "toggle-speed":
        videoState.playbackRate = nextSpeedValue(
          videoState.playbackRate,
          data.speedValues
        );
        break;
      case "increase-speed":
        videoState.playbackRate += Number(data.changeSpeedBy);
        break;
      case "decrease-speed":
        videoState.playbackRate -= Number(data.changeSpeedBy);
        break;
      case "reset-speed":
        let speed = videoState.playbackRate != 1 ? 1 : data.preferedSpeed;
        videoState.playbackRate = speed;
        break;
      case "toggle-loop":
        toggleLoop(videoState.loop, videoState.currentTime);
        break;
      case "set-loop-start":
        videoState.loop.startTime = videoState.currentTime;
        break;
      case "set-loop-end":
        if (videoState.loop.startTime != null)
          videoState.loop.stopTime = videoState.currentTime;
        break;
      case "remove-loop":
        videoState.loop.startTime = null;
        videoState.loop.stopTime = null;
        break;
    }

    ensureValidValues(videoState);
    applyState(videoState, video, currentTimeChanged);

    response(videoState);
  });
  return true; // keep port open for response from async code
});

function getCurrentVideoState() {
  var video = document.getElementsByTagName("video")[0];
  return {
    paused: video.paused,
    currentTime: video.currentTime,
    playbackRate: video.playbackRate,
    loop: { startTime: startTime, stopTime: stopTime },
  };
}

function ensureValidValues(state) {
  //TODO: constrain other values
  state.playbackRate = constrain(state.playbackRate, 0.1, 5);
}

function applyState(state, video, setCurrentTime) {
  state.paused ? video.pause() : video.play();
  if (setCurrentTime) video.currentTime = state.currentTime;
  video.playbackRate = state.playbackRate;

  startTime = state.loop.startTime;
  stopTime = state.loop.stopTime;
}

function getValues(callback) {
  let keys = ["moveVideoBy", "speedValues", "changeSpeedBy", "preferedSpeed"];
  chrome.storage.local.get(keys, (result) => {
    callback(result);
  });
}

function constrain(value, min, max) {
  if (min != null && value < min) value = min;
  if (max != null && value > max) value = max;
  return value;
}

function nextSpeedValue(curSpeed, speeds) {
  // sort in descending order
  speeds.sort((a, b) => b - a);
  let slowest = speeds[speeds.length - 1];
  let fastest = speeds[0];

  if (curSpeed <= slowest) {
    return fastest;
  } else {
    for (speed of speeds) {
      if (curSpeed - speed > 0) {
        return speed;
      }
    }
  }
}

function currentVideoState() {
  var video = document.getElementsByTagName("video")[0];
  return {
    paused: video.paused,
    currentTime: video.currentTime,
    playbackRate: video.playbackRate,
    loop: { startTime: startTime, stopTime: stopTime },
  };
}

function toggleLoop(loop, currentTime) {
  if (loop.startTime != null && loop.stopTime != null) {
    loop.startTime = null;
    loop.stopTime = null;
  } else if (loop.startTime == null && loop.stopTime == null) {
    loop.startTime = currentTime;
  } else if (loop.startTime != null && loop.stopTime == null) {
    loop.stopTime = currentTime;

    if (loop.stopTime <= loop.startTime) {
      loop.startTime = null;
      loop.stopTime = null;
    }
  }
}

var startTime;
var stopTime;

var checkLoop = setInterval(enforceLoop, 0.01);

async function enforceLoop() {
  var video = document.getElementsByTagName("video")[0];
  if(video == null) return;

  var currentTime = video.currentTime;

  if (startTime == null || stopTime == null) return;

  if (currentTime >= stopTime || currentTime < startTime) {
    var video = document.getElementsByTagName("video")[0];
    video.currentTime = startTime;
  }
}
