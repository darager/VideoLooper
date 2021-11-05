chrome.runtime.onMessage.addListener((request, sender, response) => {
  var cmd = { id: request.cmd };

  switch (cmd.id) {
    case "play-pause":
      startStopVideo();
      break;
    case "move-video-forward":
      moveVideoForward();
      break;
    case "move-video-back":
      moveVideoBack();
      break;
    case "toggle-speed":
      toggleBetweenSpeeds();
      break;
    case "increase-speed":
      increaseSpeed();
      break;
    case "decrease-speed":
      decreaseSpeed();
      break;
    case "reset-speed":
      resetSpeed();
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
});

function startStopVideo() {
  var video = document.getElementsByTagName("video")[0];
  video.paused ? video.play() : video.pause();
}

function moveVideoForward() {
  getValue("moveVideoBy", (s) => forwardVideo(s));
}
function moveVideoBack() {
  getValue("moveVideoBy", (s) => forwardVideo(-s));
}
function forwardVideo(seconds) {
  var video = document.getElementsByTagName("video")[0];
  video.currentTime = video.currentTime + seconds;
}

function toggleBetweenSpeeds() {
  getValue("speedValues", (speeds) => {
    let curSpeed = getSpeed();

    // sort in descending order
    speeds.sort((a, b) => b - a);

    let slowest = speeds[speeds.length - 1];
    let fastest = speeds[0];

    if (curSpeed <= slowest) {
      setSpeed(fastest);
    } else {
      for (speed of speeds) {
        if (curSpeed - speed > 0) {
          setSpeed(speed);
          break;
        }
      }
    }
  });
}
function resetSpeed() {
  getValue("preferedSpeed", (prefSpeed) => {
    let curSpeed = getSpeed();
    var newSpeed = curSpeed != 1 ? 1 : prefSpeed;
    setSpeed(newSpeed);
  });
}
function increaseSpeed() {
  getValue("changeSpeedBy", (ds) => changeSpeed(ds));
}
function decreaseSpeed() {
  getValue("changeSpeedBy", (ds) => changeSpeed(-ds));
}
function changeSpeed(delta) {
  var current = getSpeed();
  var speed = current + delta;
  setSpeed(speed);
}
function getSpeed() {
  var video = document.getElementsByTagName("video")[0];
  return video.playbackRate;
}
function setSpeed(speed) {
  var video = document.getElementsByTagName("video")[0];

  let min = 0.1;
  let max = 5;
  if (speed > max) speed = max;
  if (speed < min) speed = min;

  video.playbackRate = speed;
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

function getValue(key, f) {
  chrome.storage.local.get(key, (result) => {
    var value = result[key];
    f(value);
  });
}
