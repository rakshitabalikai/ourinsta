import { useEffect, useState } from 'react';
import '../css/profile.css'; // Import the CSS file for styling
import home from '../assets/icons/home.png';
import search from '../assets/icons/search.png';
import explore from '../assets/icons/explore.png';
import reels from '../assets/icons/reels.png';
import messages from '../assets/icons/messages.png';
import notifications from '../assets/icons/notifications.png';
import create from '../assets/icons/create.png';
import profileIcon from '../assets/icons/profile.png';
import hamburger from '../assets/icons/hamburger.png';

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
      <div className="menu">
        <button className='menu-button'><img src={home} alt="Home" /> Home</button>
        <button className='menu-button'><img src={search} alt="Search" /> Search</button>
        <button className='menu-button'><img src={explore} alt="Explore" /> Explore</button>
        <button className='menu-button'><img src={reels} alt="Reels" /> Reels</button>
        <button className='menu-button'><img src={messages} alt="Messages" /> Messages</button>
        <button className='menu-button'><img src={notifications} alt="Notifications" /> Notifications</button>
        <button className='menu-button'><img src={create} alt="Create" /> Create</button>
        <button className='menu-button'><img src={profileIcon} alt="Profile" /> Profile</button>
        <button className='menu-button'><img src={hamburger} alt="More" /> More</button>
      </div>

      <div className="profile-header">
        <div className="profile-pic">
          <img src={user.profilePicture || 'https://via.placeholder.com/150'} alt="Profile" />
        </div>
        <div className="profile-info">
          <div className="profile-username">
            <h2>{user.username}</h2>
            <button>Edit Profile</button>
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
