import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Search.css';
import Nav from './Nav';
import { useParams } from 'react-router-dom';

function Following() {
  const [user, setUser] = useState(null);
  const [profilePic, setProfilePic] = useState('https://via.placeholder.com/150');
  const [followingUsers, setFollowingUsers] = useState([]); // List of following users
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const { user_id } = useParams(); // Get user_id from route params
  const navigate = useNavigate(); // Initialize useNavigate for redirecting to profile

  // Fetch user and following list on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user'); // Get logged-in user from localStorage
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setProfilePic(parsedUser.profile_pic || 'https://via.placeholder.com/150');
      fetchFollowingUsers(user_id); // Fetch following users using user ID
    }
  }, [user_id]);

  // Function to fetch users the current logged-in user is following
  const fetchFollowingUsers = async (user_id) => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://socialmedia-apis-2.onrender.com/api/social_media/following/${user_id}`);
      const data = await response.json();
      console.log("data",data);
      if (response.ok) {
        setFollowingUsers(data.users); // Assuming API returns { users: [...] }
      } else {
        console.error("Error fetching following users:", data.message);
      }
    } catch (error) {
      console.error("Error fetching following users:", error);
    } finally {
      setIsLoading(false);
    }
  };
  // Function to handle follow
  const handleUnfollow = async (user_id) => {
    if (!user) {
        console.error("No logged-in user found");
        return;
    }

    const followData = {
        following_id: user.id,   // Current logged-in user
        follower_id: user_id,    // User to be unfollowed
    };

    try {
        const response = await fetch('https://socialmedia-apis-2.onrender.com/api/social_media/unfollow', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(followData),
        });

        const data = await response.json();
        if (response.ok) {
            console.log("Unfollowing:", data.message);
            alert(`You are now Unfollowing ${user_id}`);
            // Refresh the page after successful unfollow
            window.location.reload();
        } else {
            console.error("Failed to unfollow:", data.message);
            alert(data.message);
        }
    } catch (error) {
        console.error("Error unfollowing user:", error);
    }
};


  // Navigate to the user's profile page
  const handleProfileClick = (userId) => {
    navigate(`/otherprofile/${userId}`); // Redirect to the selected user's profile
  };

  return (
    <div className="search-page">
      <Nav /> {/* Navigation Bar */}
      <div className="search-contain">
        <h2>Users you are following</h2>
        {isLoading ? (
          <p>Loading...</p> // Display loading while fetching data
        ) : followingUsers.length > 0 ? (
          <ul>
            {followingUsers.map((followingUser) => (
              <div
                key={followingUser._id} // Assuming backend returns `_id` for user IDs
                className="following-item"
                onClick={() => handleProfileClick(followingUser.id)} // Navigate to selected user's profile
              >
                <div className="usercard">
                  <img
                    src={followingUser.profile_pic || 'https://via.placeholder.com/150'} // Fallback for profile picture
                    alt={followingUser.username}
                    className="profile-pic"
                  />
                  <div className="user-info">
                    <p className="username">{followingUser.username}</p>
                    <p className="full-name">{followingUser.fullName}</p>
                  </div>
                  <button onClick={(e) => { 
                      e.stopPropagation();  // Prevent triggering the profile click when following
                        handleUnfollow(followingUser.id);
                          }}>Unfollow</button>        
                </div>
              </div>
            ))}
          </ul>
        ) : (
          <p>You are not following anyone yet.</p> // Show if user isn't following anyone
        )}
      </div>
    </div>
  );
}

export default Following;
