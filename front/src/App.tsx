import React, { useState } from "react";

import VideoPlayer from "./VideoPlayer";

const host = process.env.REACT_APP_HOST || "localhost";
const port = process.env.REACT_APP_PORT || "8080";
const stream = process.env.REACT_APP_STREAM || "test";

const App = () => {
  const [error, setError] = useState(false);
  const videoJsOptions = {
    autoplay: true,
    controls: true,
    sources: [
      {
        src: `http://${host}:${port}/live/${stream}.m3u8`,
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
