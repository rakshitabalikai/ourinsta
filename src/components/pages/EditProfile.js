import React, { useState } from 'react';
import { useEffect } from 'react';

import '../css/Editprofile.css';
import Nav from './Nav';

const EditProfile = () => {
  // State to manage form data and profile picture
  const [bio, setBio] = useState('');
  const [username, setUsername] = useState('');
  const [gender, setGender] = useState('male');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [accountPrivacy, setAccountPrivacy] = useState('Public');
  const [profilePic, setProfilePic] = useState(null); // For the selected image
  const [previewPic, setPreviewPic] = useState('profile-pic-url'); // For image preview
  const [user, setUser] = useState(null);
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  // Function to handle file selection and convert it to Base64
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePic(reader.result); // Store Base64 version of image
      console.log(reader.result);
      setPreviewPic(reader.result); // Update image preview
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // Function to handle form submission (Update Profile)
  // Function to handle form submission (Update Profile)
const handleSubmit = async (e) => {
  e.preventDefault();
  console.log(profilePic);
  const updatedProfile = {
      user_id:user.id,
      email:user.email,
      bio,
      username,
      gender,
      dateOfBirth,
      accountPrivacy,
      profilePic, // Sending Base64 encoded image as part of the update
  };

  try {
      const response = await fetch('https://socialmedia-apis-2.onrender.com/api/social_media/update_profile', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedProfile),
      });

      if (response.ok) {
          alert('Profile updated successfully!');
      } else {
          const data = await response.json();
          alert(`Error: ${data.message}`);
          console.log(response);
      }
  } catch (error) {
      console.error('Error updating profile:', error);
  }
};


  return (
    <div className="profile-container">
      <Nav />

      <div className="profile-settings">
        <h2>Edit Profile</h2>

        <div className="edit-profile">
          <div className="profile-header">
            <img className="profile-pic" src={previewPic} alt="Profile Preview" />
            
            <button className="change-photo-btn"><input type="file" accept="image/*" onChange={handleImageChange} /></button>
          </div>

          <form className="profile-form" onSubmit={handleSubmit}>
            <label htmlFor="bio">Bio</label>
            <textarea
              id="bio"
              placeholder="Bio"
              maxLength="150"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            ></textarea>

            <label htmlFor="username">Username</label>
            <textarea
              id="username"
              placeholder="Username"
              maxLength="50"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            ></textarea>

            <label htmlFor="gender">Gender</label>
            <select id="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>

            <label htmlFor="date_of_birth">Date of Birth</label>
            <input
              type="date"
              id="date_of_birth"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
            />

            <label htmlFor="Account_privacy">Account Privacy</label>
            <select
              id="Account_privacy"
              value={accountPrivacy}
              onChange={(e) => setAccountPrivacy(e.target.value)}
            >
              <option value="0">Public</option>
              <option value="1">Private</option>
            </select>

            <button type="submit" className="submit-btn">Update Profile</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
