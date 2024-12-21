import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import useNavigate hook
import '../css/profile.css'; // Import the CSS file for styling
import Nav from './Nav';

function Profile() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState(''); // State for username
  const [userPosts, setUserPosts] = useState([]);
  const [postCount, setPostCount] = useState(0); // State for the post count
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
      fetchUserPosts(parsedUser.id);
    }
  }, []);
  // Function to fetch posts and user details of the specific user
const fetchUserPosts = async (userId) => {
  try {
    const response = await fetch(`http://localhost:5038/api/social_media/user_posts/${userId}`);
    const data = await response.json();

    if (response.ok) {
      setUsername(data.userDetails.username);
      setProfilePic(data.userDetails.profile_pic);
      setUserPosts(data.posts); // Set user's posts
      setPostCount(data.postCount); // Set the post count
    } else {
      console.error('Error fetching user posts:', data.message);
    }
  } catch (error) {
    console.error('Error fetching user posts:', error);
  }
};
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
    navigate(`/follower/${user.id}`); // Redirect to the followers page with user ID
  };

  // Redirect to the following page
  const handleFollowingClick = () => {
    navigate(`/Following/${user.id}`); // Redirect to the following page with user ID
  };

  if (!user) {
    return <div>Loading profile...</div>;
  }

  return (
    
    <div className="profile-container">
      <Nav />
      <div className='profile-collector'>
      <div className="profile-header">
        <div className="profile-pic">
          <img src={profilePic} alt="Profile" />
        </div>
        <div className="profile-info">
          <div className="profile-username">
            <h2>{username}</h2>
            <Link to={"/Editprofile"}><button>Edit Profile</button></Link>
            
          </div>
          <div className="profile-stats">
            <span><strong>{postCount}</strong> posts</span>
            <div className='followers_list' onClick={handleFollowersClick}>
              <span><strong>{followersCount}</strong> followers</span>
            </div>
            <div className='following_list' onClick={handleFollowingClick}>
              <span><strong>{followingCount}</strong> following</span>
            </div>
          </div>
          <div className="profile-fullname">
            <h3>{user.fullName}</h3>
          </div>
        </div>
      </div>
      
      <div className="profile-content">
        <div className="profile-posts">
          {userPosts.map((post, index) => (
            <div key={index} className="userposts">
             {post.mediaType === 'image' ? (
                    <img  className='user-postimage' src={`http://localhost:5038${post.fileUrl}`} alt={post.caption} />
                  ) : (
                    <video  className='user-postimage'controls autoPlay loop muted>
                      <source src={`http://localhost:5038${post.fileUrl}`} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )}
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
}

export default Profile;
