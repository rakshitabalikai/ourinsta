import React from 'react';
import '../css/Editprofile.css';
import Nav from './Nav';
const EditProfile = () => {
  return (
    <div className="profile-container">
      <Nav></Nav>

      <div className="profile-settings">
        <h2>Edit Profile</h2>
       

        <div className="edit-profile">
          <div className="profile-header">
            <img className="profile-pic" src="profile-pic-url" alt="Profile" />
            <button className="change-photo-btn">Change photo</button>
          </div>

          <form className="profile-form">
            <label htmlFor="bio">Bio</label>
            <textarea id="bio" placeholder="Bio" maxLength="150"></textarea>

            <label htmlFor="username">username</label>
            <textarea id="username" placeholder="username" maxLength="50"></textarea>

            <label htmlFor="gender">Gender</label>
            <select id="gender">
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>

            <label htmlFor="date_of_birth">date_of_birth</label>
            <input type="date" id="date_of_birth" placeholder="Date of Birth" />

            <label htmlFor="Account_privacy">Account privacy</label>
            <select id="Account_privacy">
              <option value="Public">Public</option>
              <option value="Private">Private</option>
            </select>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
