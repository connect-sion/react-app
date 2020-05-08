import React, { useState } from "react";

import VideoPlayer from "./VideoPlayer";

const App = () => {
  const [error, setError] = useState(false);
  const videoJsOptions = {
    autoplay: true,
    controls: true,
    sources: [
      {
        src: "http://localhost:8080/hls/test.m3u8",
        type: "application/x-mpegURL",
      },
    ],
    onError: (mediaError: boolean) => setError(mediaError),
  };

  return (
    <div>
      <VideoPlayer {...videoJsOptions} />
      {error && <span>El recurso aún no está disponible</span>}
    </div>
  );
};

export default App;
