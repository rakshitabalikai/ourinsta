import React, { useState, useEffect } from 'react';
import Nav from './Nav';
import axios from 'axios';

const Notifications = () => {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [socket, setSocket] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setUserId(parsedUser.id);
    }
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!userId) return; // Don't fetch if userId is not available
      try {
        const response = await axios.get(`http://localhost:5038/api/social_media/notifications/${userId}`);
        setNotifications(response.data.notifications);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchNotifications();

    if (userId) { // Establish WebSocket connection only if userId is available
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
              profile_pic: notification.data.profile_pic || "https://via.placeholder.com/150",
              username: notification.data.username,
              timestamp: new Date(notification.data.timestamp)
            }
          ]);
        }
      };

      // Clean up WebSocket connection when component unmounts
      return () => {
        ws.close();
      };
    }
  }, [userId]);

  return (
    <div className="notifications-container">
      <div>
        <Nav />
      </div>
      <h3>Notifications</h3>
      {loading ? ( // Display loading indicator while fetching
        <p>Loading notifications...</p>
      ) : (
        <ul>
          {notifications.map((notification, index) => (
            <li key={index} className="notification-item">
              <img 
                src={notification.profile_pic || "https://via.placeholder.com/150"} 
                alt="Profile" 
                className="notification-profile-pic" 
              />
              <div className="notification-text">
                <p><strong>{notification.username}</strong>: {notification.message}</p>
                <span className="notification-timestamp">{new Date(notification.timestamp).toLocaleString()}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;
