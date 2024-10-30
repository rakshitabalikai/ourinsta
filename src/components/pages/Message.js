import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import "../css/Message.css";
import Nav from './Nav';

function Message() {
  const [user, setUser] = useState(null);
  const [sender_id, setsender_id] = useState(null);
  const [receiver, setReceiver] = useState(null);
  const [profilePic, setProfilePic] = useState('https://via.placeholder.com/150');
  const [followingCount, setFollowingCount] = useState(0);
  const [followersCount, setFollowersCount] = useState(0);
  const [chatHistory, setChatHistory] = useState([]);
  const [message, setMessage] = useState('');
  const [ws, setWs] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [followedUsers, setFollowedUsers] = useState([]);
  const [loading, setLoading] = useState(false);  // Track chat loading state
  const navigate = useNavigate();
  const chatContainerRef = useRef(null);

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
    setLoading(true);
    const cookieKey = `chatHistory_${sender_id}_${receiverId}`;
    const storedChat = Cookies.get(cookieKey);

    if (storedChat) {
      setChatHistory(JSON.parse(storedChat));
      console.log(storedChat);
    } else {
      try {
        const response = await fetch(`http://localhost:5038/api/social_media/messages/${sender_id}/${receiverId}`);
        const data = await response.json();
        setChatHistory(data.messages);
        Cookies.set(cookieKey, JSON.stringify(data.messages), { expires: 1 }); // Store chat in cookie
      } catch (error) {
        console.error('Error fetching chat history:', error);
      }
    }
    setLoading(false);
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
        const cookieKey = `chatHistory_${sender_id}_${newMessage.receiver_id}`;

        setChatHistory((prev) => {
          const updatedChat = [...prev, newMessage];
          Cookies.set(cookieKey, JSON.stringify(updatedChat), { expires: 1 });
          return updatedChat;
        });
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
      setChatHistory((prev) => {
        const updatedChat = [...prev, messageData];
        const cookieKey = `chatHistory_${sender_id}_${selectedUserId}`;
        Cookies.set(cookieKey, JSON.stringify(updatedChat), { expires: 1 });
        return updatedChat;
      });
      setMessage('');
    }
  };

  const handleUserSelect = (user) => {
    setSelectedUserId(user.id);
    setReceiver(user);
    fetchChatHistory(user.id);
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);  // Scroll to bottom on new messages

  return (
    <div className='messagecontainer'>
      <Nav />
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
        {selectedUserId && receiver && (
          <>
            <div className='selected_user'>
              <img src={receiver.profile_pic} alt="Profile" className="profile-pic" />
              <p>{receiver.username}</p>
            </div>
            <div>
              <div 
                id="chat"
                ref={chatContainerRef} 
                style={{ height: '300px', overflowY: 'auto', border: '1px solid black', padding: '10px' }}
              >
                {loading ? (
                  <p>Loading chat history...</p>
                ) : (
                  chatHistory.map((msg, index) => (
                    <p key={index} className={msg.direction === 'sent' ? 'sent' : 'received'}>
                      {msg.message}
                    </p>
                  ))
                )}
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
