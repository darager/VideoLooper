class Video {
  getVideo() {
    return this.getVideoDomElement();
  }

  videoExists() {
    var vid = this.getVideo();
    return !(vid == null);
  }

  getVideoDomElement() {
    return document.getElementsByTagName("video")[0];
  }

  getVideoState() {
    var domVid = this.getVideoDomElement();
    return {
      paused: domVid.paused,
      currentTime: domVid.currentTime,
      playbackRate: domVid.playbackRate,
      loop: videoLoop,
    };
  }

  setVideoState(state, setCurrentTime = false) {
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
