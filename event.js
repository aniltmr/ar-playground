AFRAME.registerComponent("registerevents", { 
    init: function () { 
      const marker = this.el;
      const vid = document.getElementById("test-video");
      const a_vid = document.getElementById("a-video");
      let autoPaused = false;
      a_vid.setAttribute("visible", "false");
      marker.addEventListener("markerFound", () => {
        const markerId = marker.id;
        console.log("markerFound", markerId);
        // Turn video frame visibility on.
        a_vid.setAttribute("visible", "true");
        // autoPaused is true if the video was paused by losing track of the marker.
        if (autoPaused === true) {
          vid.play();
          autoPaused = false;
        }
      });
      marker.addEventListener ("markerLost", () => {
        const markerId = marker.id;
        console.log("markerLost", markerId);
        // Turn video frame visibility off.
        a_vid.setAttribute("visible", "false");
        // Because there's no sensible boolean to check if the video is playing...
        if (vid.currentTime !== 0 && !vid.paused && !vid.ended) {
          autoPaused = true;
          vid.pause();
        }
      });
    }
  }); 
  
  AFRAME.registerComponent("clickevents", {
    init: function() {
      const vid = document.querySelector("video");
      const playBtn = document.querySelector("a-image");
      this.el.addEventListener("mousedown", function() {
        if(vid.readyState === 4) {
          if(vid.currentTime === 0 || vid.paused || vid.ended) {
            vid.play();
            playBtn.setAttribute("opacity", "0");
          } else {
            vid.pause();
            playBtn.setAttribute("opacity", "1");
          }
        } else {
          console.error("Not enough data to play the video.");
        }
      });
    }
  });