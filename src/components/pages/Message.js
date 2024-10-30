import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../css/Message.css";
import Nav from './Nav';

function Message() {
  const [user, setUser] = useState(null);
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

  const fetchChatHistory = async (senderId, receiverId) => {
    try {
      const response = await fetch(`http://localhost:5038/api/social_media/messages/${senderId}/${receiverId}`);
      const data = await response.json();
      setChatHistory(data.messages); // Set chat history with messages
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
        setChatHistory((prev) => [...prev, JSON.parse(event.data)]);
      }
    };

    socket.onclose = () => {
      console.log('WebSocket disconnected');
    };

    return () => {
      socket.close();
    };
  }, []);

  const handleSendMessage = () => {
    if (ws && message && selectedUserId) {
      const messageData = JSON.stringify({
        sender_id: user.id,
        receiver_id: selectedUserId,
        message,
      });

      ws.send(messageData);
      setMessage('');
    }
  };

  // Fetch chat history when a new user is selected
  const handleUserSelect = (user) => {
    setSelectedUserId(user.id);
    setreciver(user);
    fetchChatHistory(user.id, user.id);  // Call the API to get chat history
  };

  return (
    <div className='messagecontainer'>
      <div>
        <Nav />
      </div>
      <div className='messages'>
        <div>
          <h3>{user?.username}</h3>
          <ul>
            {followedUsers.map((user) => (
              <li key={user.id} className='contents'>
                <img src={user.profile_pic} alt="Profile" className="profile-pic" />
                <button onClick={() => handleUserSelect(user)}>
                  {user.username}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div>
        {selectedUserId && reciver && (
          <>
            <div className='selected_user'>
              <img src={reciver.profile_pic} alt="Profile" className="profile-pic" />
              <p>{reciver.username}</p>
            </div>
            <div>
              <div id="chat" style={{ height: '300px', overflowY: 'auto', border: '1px solid black', padding: '10px' }}>
                {chatHistory.map((msg, index) => (
                  <p key={index} className={msg.direction === 'sent' ? 'sent' : 'received'}>
                    {msg.message}
                  </p>
                ))}
              </div>

              <div className='sendmessage'>
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Enter your message"
                  style={{ width: '80%' }}
                />
                <button onClick={handleSendMessage} style={{ width: '18%' }}>
                  Send
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Message;
