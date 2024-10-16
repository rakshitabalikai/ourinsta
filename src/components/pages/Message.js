import Nav from './Nav';
import '../css/Message.css'; // CSS for the message section
import '../css/Sidebar.css'; // CSS for the sidebar
import React, { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';

// const socket = io("http://localhost:5038", {
//   transports: ["websocket"], // Force WebSocket transport
// });


const Message = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const chatRef = useRef(null);
  const ws = useRef(null);

  useEffect(() => {
    // Create a WebSocket connection when the component mounts
    ws.current = new WebSocket("ws://localhost:5038");

    // When a new message is received from the WebSocket server
    ws.current.onmessage = (event) => {
      setMessages((prevMessages) => [...prevMessages, event.data]);
      // Auto-scroll to the bottom when new messages arrive
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    };

    // Cleanup the WebSocket connection when the component unmounts
    return () => {
      ws.current.close();
    };
  }, []);

  const sendMessage = () => {
    if (inputMessage) {
      // Send message to WebSocket server
      ws.current.send(inputMessage);
      setInputMessage(""); // Clear input after sending
    }
  };

  return (
    <div>
      <h1>WebSocket Chat</h1>
      <div id="chat" ref={chatRef} style={{ height: "300px", overflowY: "auto", border: "1px solid black", padding: "10px" }}>
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
      <input
        type="text"
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        placeholder="Enter your message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};



export default Message;
