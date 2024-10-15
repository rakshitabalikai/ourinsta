import Nav from './Nav';
import '../css/Message.css'; // CSS for the message section
import '../css/Sidebar.css'; // CSS for the sidebar
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io("http://localhost:5038", {
  transports: ["websocket"], // Force WebSocket transport
});


const Message = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server");
    });
  
    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });
  
    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);
  


  const sendMessage = () => {
    // Emit a message to the server
    if (message.trim()) {
      socket.emit('sendMessage', message);
      setMessage(''); // Clear the input
    }
  };

  return (
    <div>
      <h1>Chat</h1>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};



export default Message;
