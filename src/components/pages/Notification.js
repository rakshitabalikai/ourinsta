// Notifications.js
import React from 'react';
import '../css/Notification.css';
import Nav from './Nav';

function Notification() {
  // Sample data for notifications (can be replaced by API calls)
  const notifications = [
    {
      type: 'Follow Request',
      username: '_almas__',
      time: '1w',
      action: 'follow_request'
    },
    {
      type: 'Follow Request',
      username: '_shambu_011',
      time: '2w',
      action: 'follow_request'
    },
    {
      type: 'Like',
      username: 'gp_reddy__',
      time: '5w',
      post: 'Liked your post'
    },
    {
      type: 'Like',
      username: 'akshay_marambed',
      time: '10w',
      post: 'Liked your reel'
    },
    {
      type: 'Comment',
      username: 'akshay_marambed',
      time: '10w',
      post: 'commented on this post'
    }
  ];

  return (
    <div className="notifications-container">
      {/* Sidebar */}
      <Nav />

      {/* Notifications Feed */}
      <div className="notifications-feed">
        <h2>Notifications</h2>

        {/* Follow Requests */}
        <div className="notifications-section">
          <h3>This Month</h3>
          {notifications.filter(n => n.action === 'follow_request').map((notification, index) => (
            <div key={index} className="notification-item">
              <div className="profile-picture"></div>
              <div className="notification-info">
                <p>{notification.username} requested to follow you</p>
                <span>{notification.time}</span>
              </div>
              <div className="notification-actions">
                <button className="confirm-button">Confirm</button>
                <button className="delete-button">Delete</button>
              </div>
            </div>
          ))}
        </div>

        {/* Likes */}
        <div className="notifications-section">
          <h3>Earlier</h3>
          {notifications.filter(n => n.type === 'Like').map((notification, index) => (
            <div key={index} className="notification-item">
              <div className="profile-picture"></div>
              <div className="notification-info">
                <p>{notification.username} {notification.post}</p>
                <span>{notification.time}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Comments */}
        <div className="notifications-section">
          <h3>Comments</h3>
          {notifications.filter(n => n.type === 'Comment').map((notification, index) => (
            <div key={index} className="notification-item">
              <div className="profile-picture"></div>
              <div className="notification-info">
                <p>{notification.username} {notification.post}</p>
                <span>{notification.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Notification;
