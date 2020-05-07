import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import VideoPlayer from "./VideoPlayer";
import * as serviceWorker from "./serviceWorker";

const videoJsOptions = {
  autoplay: true,
  controls: true,
  sources: [
    {
      src: "http://localhost:8080/hls/test.m3u8",
      type: "application/x-mpegURL",
    },
  ],
};

ReactDOM.render(
  <React.StrictMode>
    <VideoPlayer {...videoJsOptions} />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
