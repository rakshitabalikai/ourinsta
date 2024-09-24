import { useEffect, useState } from 'react';

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get user data from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) {
    return <div>Loading profile...</div>;
  }

  return (
    <div>
      <h1>User Profile</h1>
      <p><strong>Full Name:</strong> {user.fullName}</p>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email or Mobile:</strong> {user.mobileOrEmail}</p>
    </div>
  );
}

export default Profile;
