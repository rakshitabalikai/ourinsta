import { useEffect, useState } from 'react';
import '../css/profile.css'; // Import the CSS file for styling
import Nav from './Nav';
import { Link,Outlet } from 'react-router-dom';
function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className="profile-container">
      <Nav></Nav>

      <div className="profile-header">
        <div className="profile-pic">
          <img src={user.profilePicture || 'https://via.placeholder.com/150'} alt="Profile" />
        </div>
        <div className="profile-info">
          <div className="profile-username">
            <h2>{user.username}</h2>
            <Link to={"/Editprofile"}><button>Edit Profile</button></Link>
            
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

export default Profile;
