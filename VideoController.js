chrome.runtime.onMessage.addListener((request, sender, response) => {
  var cmd = { id: request.cmd };
  var video = document.getElementsByTagName("video")[0];

  getValues((data) => {
    console.log(data);

    var videoState = {
      paused: video.paused,
      currentTime: video.currentTime,
      playbackRate: video.playbackRate
    };
    console.log(videoState);

    switch (cmd.id) {
      case "play-pause":
        videoState.paused = !videoState.paused;
        break;
      case "move-video-forward":
        videoState.currentTime += data.moveVideoBy;
        break;
      case "move-video-back":
        videoState.currentTime -= data.moveVideoBy;
        break;
      case "toggle-speed":
        videoState.playbackRate = nextSpeedValue(
          videoState.playbackRate,
          data.speedValues
        );
        break;
      case "increase-speed":
        videoState.playbackRate += data.changeSpeedBy;
        break;
      case "decrease-speed":
        videoState.playbackRate -= data.changeSpeedBy;
        break;
      case "reset-speed":
        videoState.playbackRate =
          videoState.playbackRate != 1 ? 1 : data.preferedSpeed;
        break;
      case "toggle-loop":
        loopVideo();
        break;
      case "set-loop-start":
        setLoopStart();
        break;
      case "set-loop-end":
        setLoopEnd();
        break;
      case "remove-loop":
        removeLoop();
        break;
    }

    ensureValidValues(videoState);
    applyState(videoState, video);

    response(videoState);
  });
  return true; // keep port open for response from async code
});

function ensureValidValues(state) {
  //TODO: constrain other values
  state.playbackRate = constrain(state.playbackRate, 0.1, 5);
}

function applyState(state, video) {
  state.paused ? video.pause() : video.play();
  video.currentTime = state.currentTime;
  video.playbackRate = state.playbackRate;
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

function getCurrentTime() {
  var video = document.getElementsByTagName("video")[0];
  var time = video.currentTime;
  return time;
}

function setCurrentTime(time) {
  var video = document.getElementsByTagName("video")[0];
  video.currentTime = time;
}

var startTime;
var stopTime;

function setLoopStart() {
  startTime = getCurrentTime();
}
function setLoopEnd() {
  if (startTime != null) stopTime = getCurrentTime();
}
function removeLoop() {
  startTime = null;
  stopTime = null;
}
async function loopVideo() {
  var currentTime = getCurrentTime();

  if (startTime != null && stopTime != null) {
    startTime = null;
    stopTime = null;
  } else if (startTime == null && stopTime == null) {
    startTime = currentTime;
  } else if (startTime != null && stopTime == null) {
    stopTime = currentTime;

    if (stopTime <= startTime) {
      startTime = null;
      stopTime = null;
    }
  }
}

var checkLoop = setInterval(enforceLoop, 0.01);
async function enforceLoop() {
  var currentTime = getCurrentTime();

  if (startTime == null || stopTime == null) return;

  if (currentTime >= stopTime || currentTime < startTime) {
    setCurrentTime(startTime);
  }
}
