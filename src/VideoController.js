chrome.runtime.onMessage.addListener((request, sender, response) => {;
  var cmd = { id: request.cmd };
  if(!video.exists()) return;

  var videoState = video.getState();

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
    video.setState(videoState, currentTimeChanged);

    response(videoState); // respond with current videostate for ui updates
  });
  return true; // keep port open for response from async code
});

function ensureValidValues(state) {
  //TODO: constrain other values
  var constrainedRate = constrain(state.playbackRate, 0.1, 5);
  state.playbackRate = constrainedRate.toFixed(1);
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

var checkLoop = setInterval(enforceLoop, 0.01);

async function enforceLoop() {
  if(!video.exists()) return;

  var state = video.getState();
  var currentTime = state.currentTime;
  var loop = getLoopState();

  if (loop.startTime == null || loop.stopTime == null) return;

  if (currentTime >= loop.stopTime || currentTime < loop.startTime) {
    state.currentTime = loop.startTime;
    video.setState(state, true);
  }
}
