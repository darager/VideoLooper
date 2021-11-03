import { VideoController } from "./VideoController.js";

var controller = new VideoController();

document
  .getElementById("playpauseVideo")
  .addEventListener("click", controller.PauseResume);
document
  .getElementById("forwardVideo")
  .addEventListener("click", controller.ForwardVideo);
document
  .getElementById("backVideo")
  .addEventListener("click", controller.ReverseVideo);
document
  .getElementById("slowVideo")
  .addEventListener("click", () => controller.ChangeSpeed(0.5));
document
  .getElementById("loop")
  .addEventListener("click", controller.ToggleLoop);
