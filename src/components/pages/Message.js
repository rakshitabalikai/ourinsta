import React from 'react';
import Nav from './Nav';
import '../css/Message.css'; // CSS for the message section
import '../css/Sidebar.css'; // CSS for the sidebar

const Message = () => {
  const messagesList = [
    {
      name: 'Rakshita Balikai',
      message: 'Rakshita sent an attachment.',
      time: '1h',
      profilePic: 'https://via.placeholder.com/50'
    },
    {
      name: 'Charan Raikar',
      message: 'Active now',
      time: 'now',
      profilePic: 'https://via.placeholder.com/50'
    },
    {
      name: 'D_I_V_A',
      message: 'Active 41m ago',
      time: '41m',
      profilePic: 'https://via.placeholder.com/50'
    }
  ];

  return (
    <div className="app-container">
      {/* Sidebar Section */}
      <Nav></Nav>

      {/* Messages Section */}
      <div className="messages-section">
        <div className="messages-list">
          {messagesList.map((msg, index) => (
            <div className="message-item" key={index}>
              <img src={msg.profilePic} alt={msg.name} />
              <div className="message-info">
                <h3>{msg.name}</h3>
                <p>{msg.message}</p>
                <span>{msg.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Send Message Section */}
      <div className="send-message-section">
        <div className="message-prompt">
          <h2>Your messages</h2>
          <p>Send private photos and messages to a friend or group.</p>
          <div className="send-message-btn">
            <button>Send message</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
