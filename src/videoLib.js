class Video {
  getVideoDomElement() {
    return document.getElementsByTagName("video")[0];
  }

  exists() {
    var vid = this.getVideoDomElement();
    return !(vid == null);
  }

  getState() {
    var domVid = this.getVideoDomElement();
    return {
      paused: domVid.paused,
      currentTime: domVid.currentTime,
      playbackRate: domVid.playbackRate,
      loop: videoLoop,
    };
  }

  setState(state, setCurrentTime = false) {
    var domVid = this.getVideoDomElement();

    state.paused ? domVid.pause() : domVid.play();
    if (setCurrentTime) domVid.currentTime = state.currentTime;
    domVid.playbackRate = state.playbackRate;
    videoLoop = state.loop;
  }
}

var video = new Video();

var videoLoop = { startTime: null, stopTime: null };

function getLoopState() {
  return videoLoop;
}
