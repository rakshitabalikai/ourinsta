import { useState, useEffect } from 'react';
import axios from 'axios';

function Profile() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null); // To handle any errors

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:5038/api/social_media/profile', {
          withCredentials: true, // Include session cookie
        });

        // Check if the response and its data exist
        if (response && response.data && response.data.user) {
          setUser(response.data.user);
        } else {
          setError('No user data found.');
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError(error.response?.data?.message || 'Error fetching user data');
      }
    };

    fetchUserData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>User Profile</h1>
      <p><strong>Full Name:</strong> {user.fullName}</p>
      <p><strong>Username:</strong> {user.username}</p>
    </div>
  );
}

export default Profile;
