console.log("feedback script loaded");

let func = async () => {
  //   let url = await chrome.runtime.getURL("images/loop.svg");
  //   console.log(url);

  //   var img = document.createElement("img");
  //   img.src = url;
  //   img.setAttribute("width", "40px");
  //   img.setAttribute("height", "40px");

  //   document.getElementById("container").appendChild(img);

  //   let url = await chrome.runtime.getURL("images/loop.svg");
  //   console.log(url);
  //   var img = document.getElementById("img");
  //   img.setAttribute("src", url);
  const video = document.getElementsByTagName("video")[0];
  var vidHeight = video.offsetHeight;
  var vidWidth = video.offsetWidth;
  var rect = video.getBoundingClientRect();
  var xpos = rect.left;
  var ypos = rect.top;

  var img11 = new Image();
  img11.onload = () => {
    document.body.appendChild(img11);
    img11.width = "140";
    img11.height = "140";
    img11.style.opacity = "0";
    img11.style.position = "absolute";
    img11.style.left = xpos + vidWidth / 2 - 50 + "px";
    img11.style.top = ypos + vidHeight / 2 - 50 + "px";
  };
  img11.src = await chrome.runtime.getURL("images/loop.svg");
};

chrome.runtime.onMessage.addListener(async (request, sender, response) => {
  func();
  var cmd = { id: request.cmd };
  var video = document.getElementsByTagName("video")[0];

  console.log(cmd);

  switch (cmd.id) {
    case "play-pause":
      break;
    case "move-video-forward":
      break;
    case "move-video-back":
      break;
    case "toggle-speed":
      break;
    case "increase-speed":
      break;
    case "decrease-speed":
      break;
    case "reset-speed":
      break;
    case "toggle-loop":
      break;
    case "set-loop-start":
      break;
    case "set-loop-end":
      break;
    case "remove-loop":
      break;
  }
});
