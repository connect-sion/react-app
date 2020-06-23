import React, { useRef } from 'react';
import io from 'socket.io-client';
import Layout from './Layout';

interface CandidateEvent {
  label: number | null;
  candidate: string;
}

const host = process.env.REACT_APP_HOST || 'localhost';
const port = process.env.REACT_APP_PORT || '8080';

const iceServers = {
  iceServers: [
    { urls: 'stun:stun.services.mozilla.com' },
    { urls: 'stun:stun.l.google.com:19302' },
  ],
};

const App = () => {
  const audio = useRef<HTMLAudioElement>(null);
  const socket = io(`http://${host}:${port}`);

  socket.emit('viewer');
  let rtcBroadcaster: RTCPeerConnection;

  socket.on('offer', function (
    broadcaster: string,
    sdp: RTCSessionDescriptionInit,
  ) {
    console.log('setting broadcaster', broadcaster);
    rtcBroadcaster = new RTCPeerConnection(iceServers);
    rtcBroadcaster.setRemoteDescription(sdp);
    rtcBroadcaster.createAnswer().then((sessionDescription) => {
      rtcBroadcaster.setLocalDescription(sessionDescription);
      socket.emit('answer', { type: 'answer', sdp: sessionDescription });
    });
    rtcBroadcaster.ontrack = (event) => {
      if (audio?.current) audio.current.srcObject = event.streams[0];
    };

    rtcBroadcaster.onicecandidate = (event) => {
      if (event.candidate) {
        console.log('sending ice candidate');
        socket.emit('candidate', broadcaster, {
          type: 'candidate',
          label: event.candidate.sdpMLineIndex,
          id: event.candidate.sdpMid,
          candidate: event.candidate.candidate,
        });
      }
    };
  });

  socket.on('candidate', function (
    _: string,
    { label, candidate }: CandidateEvent,
  ) {
    const iceCandidate = new RTCIceCandidate({
      sdpMLineIndex: label,
      candidate,
    });
    rtcBroadcaster.addIceCandidate(iceCandidate);
  });

  return (
    <Layout>
      <audio controls ref={audio} autoPlay></audio>
    </Layout>
  );
};

export default App;
