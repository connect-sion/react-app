import React, { useRef } from 'react';
import io from 'socket.io-client';
import Peer from 'simple-peer';
import Layout from './Layout';

const host = process.env.REACT_APP_HOST || 'localhost';
const port = process.env.REACT_APP_PORT || '8080';

interface Signal {
  peerId: string;
  signal: any;
}

const App = () => {
  const audio = useRef<HTMLAudioElement>(null);
  const socket = io(`http://${host}:${port}`);

  let peer = new Peer({ initiator: true });
  socket.on('connect', () => {
    console.log(socket.id);
    socket.emit('peer', { peerId: socket.id });
  });

  peer.on('connect', () => console.log('connected'));

  // peer signaling
  socket.on('signal', (data: Signal) => {
    if (data.peerId === socket.id) {
      peer.signal(data.signal);
    }
  });
  peer.on('signal', (signal) => {
    socket.emit('signal', { signal, peerId: socket.id });
  });

  peer.on('error', (error) => {
    console.error(error);
  });

  peer.on('stream', (stream) => {
    console.log(stream);

    if (audio.current) {
      audio.current.srcObject = stream;
      audio.current.play();
    }
  });

  return (
    <Layout>
      <audio controls ref={audio}></audio>
    </Layout>
  );
};

export default App;
