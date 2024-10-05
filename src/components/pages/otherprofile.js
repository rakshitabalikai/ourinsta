import { useEffect, useState } from 'react';
import '../css/profile.css'; // Import the CSS file for styling
import Nav from './Nav';
import { useParams } from 'react-router-dom';

function OtherProfile() {
  const { userId } = useParams();  // Destructure userId from useParams
  const [user, setUser] = useState(null);
  const [profilepic, setProfilePic] = useState('https://via.placeholder.com/150');

  useEffect(() => {
    // Fetch the user data based on userId passed from the route
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`http://localhost:5038/api/social_media/user/${userId}`);
        const data = await response.json();

        if (response.ok) {
          setUser(data.user);
          setProfilePic(data.user.profile_pic || 'https://via.placeholder.com/150'); // Set profile pic from user data
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [userId]);

  if (!user) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className="profile-container">
      <Nav />
      <div className="profile-header">
        <div className="profile-pic">
          <img src={profilepic} alt="Profile" />
        </div>
        <div className="profile-info">
          <div className="profile-username">
            <h2>{user.username}</h2>
            <button>Follow</button>
            <button className="settings-button">&#9881;</button>
          </div>
          <div className="profile-stats">
            <span><strong>2</strong> posts</span>
            <span><strong>142</strong> followers</span>
            <span><strong>168</strong> following</span>
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

export default OtherProfile;
