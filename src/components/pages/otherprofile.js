import { useEffect, useState } from 'react';
import '../css/profile.css'; // Import the CSS file for styling
import Nav from './Nav';
import { useParams,useNavigate } from 'react-router-dom';

function OtherProfile() {
  const { userId } = useParams();  // Destructure userId from useParams
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState(''); // State for username
  const [userPosts, setUserPosts] = useState([]);
  const [postCount, setPostCount] = useState(0); // State for the post count
  const [profilepic, setProfilePic] = useState('https://via.placeholder.com/150');
  const [currentUser, setCurrentUser] = useState(null);  // Store the logged-in user
  const [followingCount, setFollowingCount] = useState(0); // New state for following count
  const [followersCount, setFollowersCount] = useState(0); // New state for followers count
  const navigate = useNavigate(); 
  // useEffect(() => {
  //   // Fetch the logged-in user from local storage
  //   const storedUser = localStorage.getItem('user');
  //   if (storedUser) {
  //     const parsedUser = JSON.parse(storedUser);
  //     setCurrentUser(parsedUser);
  //   }
  // }, []);

   // Redirect to the followers page
   const handleFollowersClick = () => {
    navigate(`/follower/${user.id}`); // Redirect to the followers page with user ID
  };

  // Redirect to the following page
  const handleFollowingClick = () => {
    navigate(`/Following/${user.id}`); // Redirect to the following page with user ID
  };


  useEffect(() => {
    // Fetch the user data based on userId passed from the route
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`https://socialmedia-apis-2.onrender.com/api/social_media/user/${userId}`);
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
    fetchUserPosts(userId);
    fetchFollowStats(userId);
  }, [userId]);

  const fetchFollowStats = async (userId) => {
    try {
      const response = await fetch(`https://socialmedia-apis-2.onrender.com/api/social_media/follow_stats/${userId}`);
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

  const fetchUserPosts = async (userId) => {
    try {
      const response = await fetch(`https://socialmedia-apis-2.onrender.com/api/social_media/user_posts/${userId}`);
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
  // Follow function
  const handleFollow = async () => {
    if (!currentUser) {
      console.error("No logged-in user found");
      return;
    }

    const followData = {
      follower: currentUser.id,   // Current logged-in user
      user_id: userId,    // User to be followed (the one being viewed)
    };

    try {
      const response = await fetch('https://socialmedia-apis-2.onrender.com/api/social_media/follow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(followData),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Following:", data.message);
        alert(`You are now following ${user.username}`);
      } else {
        console.error("Failed to follow:", data.message);
        alert(data.message);
      }
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

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
            <button onClick={handleFollow}>Follow</button> {/* Follow button */}
            <button className="settings-button">&#9881;</button>
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
            <div key={index} className="post-item">
             {post.mediaType === 'image' ? (
                    <img src={`http://localhost:5038${post.fileUrl}`} alt={post.caption} />
                  ) : (
                    <video controls autoPlay loop muted>
                      <source src={`http://localhost:5038${post.fileUrl}`} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OtherProfile;
