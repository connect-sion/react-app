import React, { useRef, useEffect } from 'react';
import io from 'socket.io-client';
import Layout from './Layout';

const host = process.env.REACT_APP_HOST || 'localhost';
const port = process.env.REACT_APP_PORT || '8080';

const App = () => {
  const audio = useRef<HTMLAudioElement>(null);
  const socket = io(`http://${host}:${port}`);
  const config = { iceServers: [{ urls: ['stun:stun.l.google.com:19302'] }] };

  useEffect(() => {
    let peerConnection: RTCPeerConnection;
    socket.on('offer', (id: string, description: RTCSessionDescriptionInit) => {
      peerConnection = new RTCPeerConnection(config);
      peerConnection
        .setRemoteDescription(description)
        .then(() => peerConnection.createAnswer())
        .then((sdp) => peerConnection.setLocalDescription(sdp))
        .then(() => {
          socket.emit('answer', id, peerConnection.localDescription);
        })
        .catch(console.error);
      peerConnection.ontrack = (event) => {
        console.log('Incoming stream');
        if (audio?.current) audio.current.srcObject = event.streams[0];
      };
      peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit('candidate', id, event.candidate);
        }
      };
    });

    socket.on('candidate', (id: string, candidate: RTCIceCandidateInit) => {
      if (peerConnection.remoteDescription) {
        peerConnection
          .addIceCandidate(new RTCIceCandidate(candidate))
          .catch((e) => console.error(e));
      }
    });

    socket.on('connect', () => {
      socket.emit('watcher');
    });

    socket.on('broadcaster', () => {
      socket.emit('watcher');
    });

    socket.on('disconnectPeer', () => {
      peerConnection.close();
    });
    return () => {
      socket.close();
    };
  });

  return (
    <Layout>
      <audio controls ref={audio}></audio>
    </Layout>
  );
};

export default App;
