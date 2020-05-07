import React, { useEffect, useRef } from "react";
import videojs, { VideoJsPlayer, VideoJsPlayerOptions } from "video.js";
import "video.js/dist/video-js.css";

const VideoPlayer = (props: VideoJsPlayerOptions) => {
  const videoNode = useRef(null);

  useEffect(() => {
    let player: VideoJsPlayer | null = videojs("video-node", props, () =>
      console.log("onPlayerReady")
    );
    return () => {
      if (player) {
        player.dispose();
      }
    };
  });

  return (
    <div>
      <div data-vjs-player>
        <video id="video-node" ref={videoNode} className="video-js"></video>
      </div>
    </div>
  );
};

export default VideoPlayer;
