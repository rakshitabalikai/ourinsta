import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../css/Message.css";
import Nav from './Nav';

function Message() {
  const [user, setUser] = useState(null);
  const [sender_id, setsender_id] = useState(null);
  const [reciver, setreciver] = useState(null);
  const [profilePic, setProfilePic] = useState('https://via.placeholder.com/150');
  const [followingCount, setFollowingCount] = useState(0);
  const [followersCount, setFollowersCount] = useState(0);
  const [chatHistory, setChatHistory] = useState([]);
  const [message, setMessage] = useState('');
  const [ws, setWs] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [followedUsers, setFollowedUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setsender_id(parsedUser.id);
      setProfilePic(parsedUser.profile_pic || 'https://via.placeholder.com/150');
      fetchFollowStats(parsedUser.id);
      fetchFollowedUsers(parsedUser.id);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const fetchFollowStats = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5038/api/social_media/follow_stats/${userId}`);
      const data = await response.json();
      setFollowingCount(data.followingCount);
      setFollowersCount(data.followersCount);
    } catch (error) {
      console.error('Error fetching follow stats:', error);
    }
  };

  const fetchFollowedUsers = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5038/api/social_media/following/${userId}`);
      const data = await response.json();
      setFollowedUsers(data.users);
    } catch (error) {
      console.error('Error fetching followed users:', error);
    }
  };

  const fetchChatHistory = async (receiverId) => {
    try {
      const response = await fetch(`http://localhost:5038/api/social_media/messages/${sender_id}/${receiverId}`);
      const data = await response.json();
      setChatHistory(data.messages);
    } catch (error) {
      console.error('Error fetching chat history:', error);
    }
  };

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:5038');
    setWs(socket);

    socket.onopen = () => {
      console.log('WebSocket connected');
    };

    socket.onmessage = (event) => {
      if (typeof event.data === 'string') {
        const newMessage = JSON.parse(event.data);
        setChatHistory((prev) => [...prev, newMessage]);
      }
    };

    socket.onclose = () => {
      console.log('WebSocket disconnected');
    };

    return () => {
      socket.close();
    };
  }, [sender_id]);

  const handleSendMessage = () => {
    if (ws && message && selectedUserId) {
      const messageData = {
        sender_id: user.id,
        receiver_id: selectedUserId,
        message,
        timestamp: new Date().toISOString(),
        direction: 'sent',
      };

      ws.send(JSON.stringify(messageData));
      setChatHistory((prev) => [...prev, messageData]);
      setMessage('');
    }
  };

  const handleUserSelect = (user) => {
    setSelectedUserId(user.id);
    setreciver(user);
    fetchChatHistory(user.id);
  };

  return (
    <div className="message-container">
      <Nav />
      <div className="message-content">
        <div className="user-list">
          <h3>{user?.username}</h3>
          <ul>
            {followedUsers.map((user) => (
              <li key={user.id} className="user-item">
                <img src={user.profile_pic} alt="Profile" className="profile-pic" />
                <button className='userButton' onClick={() => handleUserSelect(user)}>
                  {user.username}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="chat-section">
          {selectedUserId && reciver ? (
            <>
              <div className="selected-user-info">
                <img src={reciver.profile_pic} alt="Profile" className="profile-pic" />
                <p>{reciver.username}</p>
              </div>
              <div className="chat-box">
                {chatHistory.map((msg, index) => (
                  <p key={index} className={`chat-message ${msg.direction === 'sent' ? 'sent' : 'received'}`}>
                    {msg.message}
                  </p>
                ))}
              </div>
              <div className="message-input">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Enter your message"
                />
                <button onClick={handleSendMessage}>Send</button>
              </div>
            </>
          ) : (
            <div className="no-chat-selected">Select a user to start chatting</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Message;
