import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate hook
import '../css/Search.css';
import Nav from './Nav';
import { useParams } from 'react-router-dom';

function Following() {
  const [user, setUser] = useState(null);
  const [profilePic, setProfilePic] = useState('https://via.placeholder.com/150');
  const [followingUsers, setFollowingUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const user_id = useParams();
  const navigate = useNavigate();  // Initialize useNavigate

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setProfilePic(parsedUser.profile_pic || 'https://via.placeholder.com/150');
      fetchFollowingUsers(user_id); // Fetch following users using user ID
    }
  }, []);

  // Fetch users the current logged-in user is following
  const fetchFollowingUsers = async (user_id) => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:5038/api/social_media/following/${user_id}`);
      const data = await response.json();

      if (response.ok) {
        setFollowingUsers(data); // Set the following users list
      } else {
        console.error("Error fetching following users:", data.message);
      }
    } catch (error) {
      console.error("Error fetching following users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Navigate to the user's profile page
  const handleProfileClick = (user_id) => {
    navigate(`/otherprofile/${user_id}`);  // Redirect to /profile/:user_id
  };

  return (
    <div className="following-page">
      <Nav />
      <div className="following-container">
        <h2>Users you are following</h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : followingUsers.length > 0 ? (
          <ul>
            {followingUsers.map((followingUser) => (
              <div
                key={followingUser._id}
                className="following-item"
                onClick={() => handleProfileClick(followingUser._id)} // Redirect on click
              >
                <div className='usercard'>
                  <img
                    src={followingUser.profile_pic || 'https://via.placeholder.com/150'}
                    alt={followingUser.username}
                    className="profile-pic"
                  />
                  <div className="user-info">
                    <p className="username">{followingUser.username}</p>
                    <p className="full-name">{followingUser.fullName}</p>
                  </div>
                </div>
              </div>
            ))}
          </ul>
        ) : (
          <p>You are not following anyone yet.</p>
        )}
      </div>
    </div>
  );
}

export default Following;
