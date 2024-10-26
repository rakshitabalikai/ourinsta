import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../css/Message.css";
import Nav from './Nav';

function Message() {
  const [user, setUser] = useState(null);
  const [reciver, setreciver] = useState(null);
  const [profilePic, setProfilePic] = useState('https://via.placeholder.com/150');
  const [followingCount, setFollowingCount] = useState(0); // New state for following count
  const [followersCount, setFollowersCount] = useState(0); // New state for followers count
  const [chatHistory, setChatHistory] = useState([]);
  const [message, setMessage] = useState('');
  const [ws, setWs] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null); // ID of the user to chat with
  const [followedUsers, setFollowedUsers] = useState([]); // List of users the current user follows
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  // Fetch the logged-in user and follow stats
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setProfilePic(parsedUser.profile_pic || 'https://via.placeholder.com/150');
      fetchFollowStats(parsedUser.id); // Fetch follow stats using user ID
      fetchFollowedUsers(parsedUser.id); // Fetch the followed users
    } else {
      navigate('/login'); // Redirect to login if no user is found
    }
  }, [navigate]);

  // Function to fetch follow stats (followers and following count)
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

  // Fetch followed users list
  const fetchFollowedUsers = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5038/api/social_media/following/${userId}`);
      const data = await response.json();
      setFollowedUsers(data.users);
    } catch (error) {
      console.error('Error fetching followed users:', error);
    }
  };

  // Establish WebSocket connection when component mounts
  useEffect(() => {
    const socket = new WebSocket('ws://localhost:5038');
    setWs(socket);

    socket.onopen = () => {
      console.log('WebSocket connected');
    };

    socket.onmessage = (event) => {
      if (typeof event.data === 'string') {
        // Handle text message
        setChatHistory((prev) => [...prev, event.data]);
      }
    };

    socket.onclose = () => {
      console.log('WebSocket disconnected');
    };

    return () => {
      socket.close();
    };
  }, []);

  // Send a message through WebSocket
  const handleSendMessage = () => {
    if (ws && message && selectedUserId) {
      const messageData = JSON.stringify({
        sender_id: user.id, // ID of the logged-in user
        receiver_id: selectedUserId, // ID of the user to chat with
        message,
      });

      ws.send(messageData);
      setMessage(''); // Clear input field
    }
  };

  return (
    <div className='messagecontainer'>
      <div>
        <Nav></Nav>
      </div>
      <div className='messages'>
        <div>
        <h3>Welcome, {user?.username}</h3>
            <img src={profilePic} alt="Profile" style={{ width: '150px', height: '150px' }} />
          <p>Following: {followingCount}</p>
            <p>Followers: {followersCount}</p>
          </div>

        <div>
          <h3>Select a User to Chat With:</h3>
          <ul>
          {followedUsers.map((user) => (
              <li key={user.id}>
              <img src={user.profilePic} alt="Profile" style={{ width: '150px', height: '150px' }} />
              <button onClick={() => { setSelectedUserId(user.id); setreciver(user); }}>
                  {user.username} ({user.id})
              </button>
            </li>
          ))}
          </ul>
          </div>
        </div>  

        <div>
          {selectedUserId && (
            <>
                <div>
                <img src={reciver.profilePic} alt="Profile" style={{ width: '150px', height: '150px' }} />
                {selectedUserId}
                </div>
                <div>
                <div id="chat" style={{ height: '300px', overflowY: 'auto', border: '1px solid black', padding: '10px' }}>
                {chatHistory.map((msg, index) => (
                  <p key={index}>{msg}</p>
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
