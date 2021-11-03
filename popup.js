import {
  startStopVideo,
  moveVideoForward,
  moveVideoBack,
  setSpeed,
  loopVideo,
} from "./VideoController.js";

document
  .getElementById("playpauseVideo")
  .addEventListener("click", startStopVideo);
document
  .getElementById("forwardVideo")
  .addEventListener("click", moveVideoForward);
document
  .getElementById("backVideo")
  .addEventListener("click", moveVideoBack);
document
  .getElementById("slowVideo")
  .addEventListener("click", setSpeed);
document
  .getElementById("loop")
  .addEventListener("click", loopVideo);
