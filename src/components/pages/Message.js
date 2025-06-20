import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../css/Message.css";
import Nav from './Nav';
import addbtn from '../assets/icons/addbtn.png';
import { Link } from 'react-router-dom';

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
  const [selectedMessages, setSelectedMessages] = useState([]);

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
  const toggleSelectMessage = (messageId) => {
    setSelectedMessages(prevSelected =>
      prevSelected.includes(messageId)
        ? prevSelected.filter(id => id !== messageId)  // Deselect if already selected
        : [...prevSelected, messageId]  // Add to selected
    );
  };
  const handleDeleteSelectedMessages = async () => {
    try {
      await fetch(`https://socialmedia-apis-2.onrender.com/api/social_media/messages/delete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messageIds: selectedMessages }),
      });
  
      // Filter out deleted messages from chat history
      setChatHistory(prevChatHistory => 
        prevChatHistory.filter(msg => !selectedMessages.includes(msg._id))
      );
      setSelectedMessages([]); // Clear selection after deletion
    } catch (error) {
      console.error('Error deleting messages:', error);
    }
  };
    
  const fetchFollowStats = async (userId) => {
    try {
      const response = await fetch(`https://socialmedia-apis-2.onrender.com/api/social_media/follow_stats/${userId}`);
      const data = await response.json();
      setFollowingCount(data.followingCount);
      setFollowersCount(data.followersCount);
    } catch (error) {
      console.error('Error fetching follow stats:', error);
    }
  };

  const fetchFollowedUsers = async (userId) => {
    try {
      const response = await fetch(`https://socialmedia-apis-2.onrender.com/api/social_media/following/${userId}`);
      const data = await response.json();
      setFollowedUsers(data.users);
    } catch (error) {
      console.error('Error fetching followed users:', error);
    }
  };

  const fetchChatHistory = async (receiverId) => {
    try {
      const response = await fetch(`https://socialmedia-apis-2.onrender.com/api/social_media/messages/${sender_id}/${receiverId}`);
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
          {/* <div className='addbtn'>
          <Link to={"/addbtn"}><button><img src={addbtn} alt='addbtn'/></button></Link>
          </div> */}
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
                  <div key={index} className={`chat-message ${msg.direction === 'sent' ? 'sent' : 'received'}`}>
                    <input
                      type="checkbox"
                      checked={selectedMessages.includes(msg._id)}
                      onChange={() => toggleSelectMessage(msg._id)}
                    />
                    {msg.message}
                  </div>
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
                {selectedMessages.length > 0 && (
                    <button onClick={handleDeleteSelectedMessages}>Delete Selected</button>
                )}

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
