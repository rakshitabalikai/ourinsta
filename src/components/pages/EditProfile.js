import React from 'react';
import '../css/Editprofile.css';

const EditProfile = () => {
  return (
    <div className="profile-container">
      <div className="sidebar">
        <div className="menu">
          <h3>Instagram</h3>
          <ul>
            <li>Home</li>
            <li>Search</li>
            <li>Explore</li>
            <li>Reels</li>
            <li>Messages</li>
            <li>Notifications</li>
            <li>Create</li>
            <li>Profile</li>
          </ul>
        </div>
      </div>

      <div className="profile-settings">
        <h2>Edit Profile</h2>
       

        <div className="edit-profile">
          <div className="profile-header">
            <img className="profile-pic" src="profile-pic-url" alt="Profile" />
            <button className="change-photo-btn">Change photo</button>
          </div>

          <form className="profile-form">
            <label htmlFor="website">Website</label>
            <input type="text" id="website" placeholder="Website" disabled />

            <label htmlFor="bio">Bio</label>
            <textarea id="bio" placeholder="Bio" maxLength="150"></textarea>

            <label htmlFor="gender">Gender</label>
            <select id="gender">
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
