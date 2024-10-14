import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import useNavigate hook
import '../css/profile.css'; // Import the CSS file for styling
import Nav from './Nav';

function Profile() {
  const [user, setUser] = useState(null);
  const [profilePic, setProfilePic] = useState('https://via.placeholder.com/150');
  const [followingCount, setFollowingCount] = useState(0); // New state for following count
  const [followersCount, setFollowersCount] = useState(0); // New state for followers count
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setProfilePic(parsedUser.profile_pic || 'https://via.placeholder.com/150');
      fetchFollowStats(parsedUser.id); // Fetch follow stats using user ID
    }
  }, []);

  // Function to fetch follow stats from the API
  const fetchFollowStats = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5038/api/social_media/follow_stats/${userId}`);
      const data = await response.json();

      if (response.ok) {
        setFollowingCount(data.followingCount); // Set the following count
        setFollowersCount(data.followersCount); // Set the followers count
      } else {
        console.error('Error fetching follow stats:', data.message);
      }
    } catch (error) {
      console.error('Error fetching follow stats:', error);
    }
  };

  // Redirect to the followers page
  const handleFollowersClick = () => {
    navigate(`/followers/${user.id}`); // Redirect to the followers page with user ID
  };

  // Redirect to the following page
  const handleFollowingClick = () => {
    navigate(`/following/${user.id}`); // Redirect to the following page with user ID
  };

  if (!user) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className="profile-container">
      <Nav></Nav>

      <div className="profile-header">
        <div className="profile-pic">
          {/* Use profilePic state for image source */}
          <img src={profilePic} alt="Profile" />
        </div>
        <div className="profile-info">
          <div className="profile-username">
            <h2>{user.username}</h2>
            <Link to={"/Editprofile"}><button>Edit Profile</button></Link>
            <button className="settings-button">&#9881;</button>
          </div>
          <div className="profile-stats">
            <span><strong>2</strong> posts</span>
            <div className='followers_list' onClick={handleFollowersClick}>
              <span><strong>{followersCount}</strong> followers</span> {/* Display followers count */}
            </div>
            <div className='following_list' onClick={handleFollowingClick}>
              <span><strong>{followingCount}</strong> following</span> {/* Display following count */}
            </div>
          </div>
          <div className="profile-fullname">
            <h3>{user.fullName}</h3>
          </div>
        </div>
      </div>

      <div className="profile-content">
        <div className="profile-posts">
          {/* Render user posts here */}
        </div>
      </div>
    </div>
  );
}

export default Profile;
