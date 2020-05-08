import React, { useEffect, useRef } from "react";
import videojs, { VideoJsPlayer, VideoJsPlayerOptions } from "video.js";
import "video.js/dist/video-js.css";

const VideoPlayer = (
  props: VideoJsPlayerOptions & { onError: (error: boolean) => void }
) => {
  const { onError, ...options } = props;
  const videoNode = useRef(null);

  useEffect(() => {
    let player: VideoJsPlayer = videojs(videoNode.current, options, () => {
      console.log("onPlayerReady");
    });

    player.on("error", () => {
      const error = player.error();
      if (error) {
        onError(true);
      }
    });
    return () => {
      player.dispose();
    };
  });

  return (
    <div data-vjs-player>
      <video ref={videoNode} className="video-js"></video>
    </div>
  );
};

export default VideoPlayer;
