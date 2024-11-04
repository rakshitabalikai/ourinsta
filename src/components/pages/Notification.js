import React, { useState, useEffect } from 'react';
import Nav from './Nav';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const userId = localStorage.getItem('userId'); // Get the logged-in user's ID
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Establish WebSocket connection
    const ws = new WebSocket(`ws://localhost:5038`);
    setSocket(ws);

    // Listen for WebSocket messages
    ws.onmessage = (event) => {
      const notification = JSON.parse(event.data);

      if (notification.type === 'notification') {
        // Append new notification to the notifications list
        setNotifications((prevNotifications) => [
          ...prevNotifications,
          {
            message: notification.data.message,
            profile_pic: notification.data.profile_pic,
            timestamp: new Date(notification.data.timestamp)
          }
        ]);
      }
    };

    // Clean up WebSocket connection when component unmounts
    return () => {
      ws.close();
    };
  }, [userId]);

  return (
    <div className="notifications-container">
      <div>
        <Nav></Nav>
      </div>
      <h3>Notifications</h3>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index} className="notification-item">
            <img src={notification.profile_pic} alt="Profile" className="notification-profile-pic" />
            <div className="notification-text">
              <p>{notification.message}</p>
              <span className="notification-timestamp">{notification.timestamp.toLocaleString()}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
