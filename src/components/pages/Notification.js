import React, { useState, useEffect } from 'react';
import Nav from './Nav';
import "../css/Notification.css"
import axios from 'axios';

const Notifications = () => {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [notifications, setNotifications] = useState([]);
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
        const response = await axios.get(`https://socialmedia-apis-2.onrender.com/api/social_media/notifications/${userId}`);
        setNotifications(response.data.notifications);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchNotifications();
  }, [userId]);

  return (
    <div className="notifications-container">
      <div>
        <Nav />
      </div>
      <div className='notification-collector'>
        <h3>Notifications</h3>
        {loading ? (
          <p>Loading notifications...</p>
        ) : (
          <ul>
            {notifications.map((notification, index) => (
              <li key={index} className="notification-item">
                <img 
                  src={notification.senderDetails.profilePic || "https://via.placeholder.com/150"} 
                  alt="Profile" 
                  className="notification-profile-pic" 
                />
                <div className="notification-text">
                  <p>
                    <strong>{notification.senderDetails.username || "Unknown"}</strong>:
                    {notification.type === "comment"
                      ? ` commented on your post: "${notification.comment}"`
                      : notification.type === "follow"
                      ? ` started following you!`
                      : notification.message}
                  </p>
                  <span className="notification-timestamp">{new Date(notification.timestamp).toLocaleString()}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Notifications;
