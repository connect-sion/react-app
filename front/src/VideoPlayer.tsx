import React, { useEffect, useRef } from "react";
import videojs, { VideoJsPlayer, VideoJsPlayerOptions } from "video.js";

const VideoPlayer = (props: VideoJsPlayerOptions) => {
  const videoNode = useRef(null);
  let player: VideoJsPlayer | null = null;

  useEffect(() => {
    player = videojs(videoNode, props, () => console.log("onPlayerReady"));
    return () => {
      if (player) {
        player.dispose();
      }
    };
  });

  return (
    <div>
      <div data-vjs-player>
        <video ref={videoNode} className="video-js"></video>
      </div>
    </div>
  );
};

export default VideoPlayer;
