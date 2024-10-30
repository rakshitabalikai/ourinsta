import React, { useState, useEffect } from 'react';
import { Link,Outlet } from 'react-router-dom';
import home from '../assets/icons/home.png';
import search from '../assets/icons/search.png';
import explore from '../assets/icons/explore.png';
import reels from '../assets/icons/reels.png';
import messages from '../assets/icons/messages.png';
import notifications from '../assets/icons/notifications.png';
import create from '../assets/icons/create.png';
import profileIcon from '../assets/icons/profile.png';
import hamburger from '../assets/icons/hamburger.png';
import like from '../assets/icons/liked.png'
import comment from '../assets/icons/comment.png'
import { useNavigate } from 'react-router-dom';
import '../css/Home.css';
import Nav from './Nav';

function Home() {
  const [posts, setPosts] = useState([]);
  const [stories, setStories] = useState([]);
  const [user, setUser] = useState(null);
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      console.log(parsedUser);
      setUser(parsedUser);
      fetchSuggestedUsers(parsedUser.id);
    }
  }, []);
  // Fetch posts and stories when the component mounts
  useEffect(() => {
    // Fetch stories from API
    fetch('http://localhost:5038/api/social_media/stories')
      .then(response => {
        if (response.headers.get('content-type').includes('application/json')) {
          return response.json();
        } else {
          throw new Error('Stories response is not JSON');
        }
      })
      .then(data => setStories(data))
      .catch(error => {
        console.error('Error fetching stories:', error);
        alert('Failed to load stories');
      });


    // Fetch posts from API
    fetch('http://localhost:5038/api/social_media/posts')
      .then(response => {
        if (response.headers.get('content-type').includes('application/json')) {
          return response.json();
          
        } else {
          throw new Error('Posts response is not JSON');
        }
      })
      .then(data => setPosts(data))
      .catch(error => {
        console.error('Error fetching posts:', error);
        alert('Failed to load posts');
      });
  }, []);
  const handleFollow = async (user_id) => {
    if (!user) {
        console.error("No logged-in user found");
        return;
    }

    const followData = {
        following_id: user.id,   // Current logged-in user
        follower_id: user_id,    // User to be followed
    };

    try {
        const response = await fetch('http://localhost:5038/api/social_media/follow', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(followData),
        });

        const data = await response.json();
        if (response.ok) {
            console.log("Following:", data.message);
            alert(`You are now following ${user_id}`);
        } else {
            console.error("Failed to follow:", data.message);
            alert(data.message);
        }
    } catch (error) {
        console.error("Error following user:", error);
    }
};

// Navigate to the user's profile page
const handleProfileClick = (user_id) => {
    navigate(`/otherprofile/${user_id}`);  // Redirect to /profile/:user_id
};

  const fetchSuggestedUsers = async (user_id) => {
    try {
      const response = await fetch(`http://localhost:5038/api/social_media/suggestions/${user_id}`);
      const data = await response.json();
      console.log("Suggested Users:", data.suggestedUsers);
      if (response.ok) {
        setSuggestedUsers(data.suggestedUsers);
      } else {
        console.error("Error fetching suggestions:", data.message);
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }  
  };
  


  return (
    <div className="home-container">
      {/* Sidebar */}
      <div className="menu1">
        <Link to={"/home"}><button className='menu-button'><img src={home} alt="Home" /> Home</button></Link>
        <Link to={"/search"}><button className='menu-button'><img src={search} alt="Search" /> Search</button></Link> 
        <Link to={"/Explore"}><button className='menu-button'><img src={explore} alt="Explore" /> Explore</button></Link>
        <Link to={"/Reels"}><button className='menu-button'><img src={reels} alt="Reels" /> Clip</button></Link> 
        <Link to={"/messages"}><button className='menu-button'><img src={messages} alt="Messages" /> Messages</button></Link>
        <Link to={"/Notification"}><button className='menu-button'><img src={notifications} alt="Notifications" /> Notifications</button></Link>
        <Link to={"/create"}><button className='menu-button'><img src={create} alt="Create" /> Create</button></Link>
        <Link to={"/profile"}><button className='menu-button'><img src={profileIcon} alt="Profile" /> Profile</button></Link>
        <button className='menu-button'><img src={hamburger} alt="More" /> More</button>
        <Outlet></Outlet>
      </div>
      

      {/* Main Feed */}
       <div className="main-feed"> 
        {/* Stories */}
        {/* <div className="stories"> */}
          {/* {stories.length > 0 ? ( */}
            {/* stories.map((story, index) => ( */}
              {/* <Link key={index} to={`/story/${story._id}`} className="story"> */}
                {/* {story.title} by {story.username} */}
              {/* </Link> */}
            {/* )) */}
          {/* ) : ( */}
            {/* <p>No stories available.</p> */}
          {/* )} */}
        {/* </div> */}

        {/* Post */}
        <div className="posts">
          {posts.length > 0 ? (
            posts.map((post, index) => (
              <div key={index} className="post autoshow">
                <div className="post-header">
                  <div className="profile-picture">
                    <img src={post.user.profile_pic} alt="" />
                  </div>
                  <div className="profile-info">
                    <p>{post.user.username}</p>
                    <span>{post.location}</span>
                  </div>
                </div>
                <div className="post-image">
                  {post.file && post.file.startsWith("data:image") ? (
                    <img src={post.file} alt={post.caption} />
                  ) : (
                    <video autoPlay loop muted>
                      <source src={post.file} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>
                <div className='postDescription'>
                <p className='captions'>{post.caption}</p>
                  <div className='likeandcomment'>
                    <button className='menu-button'><img src={comment} alt="Home" /></button>
                    <button className='menu-button'><img src={like} alt="Home" /></button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No posts available.</p>
          )}
        </div>
      </div>

      {/* Suggestions */}
      <div className="suggestions">
        <p className='suggestion-header'>Suggestions For You </p>
        <ul>
                            {suggestedUsers.length > 0 ? (
                                suggestedUsers.map((resultUser) => (
                                    <div 
                                        key={resultUser.id} 
                                        className="search-result-item"
                                        onClick={() => handleProfileClick(resultUser.id)} // Redirect on click
                                    >
                                        <div className='usercard1'>
                                            <img 
                                                src={resultUser.profile_pic}
                                                alt={resultUser.username} 
                                                className="profile-pic"
                                            />
                                            <div className="user-info">
                                                <p className="username">{resultUser.username}</p>
                                                <p className="full-name">{resultUser.fullName}</p>
                                            </div>
                                            <button onClick={(e) => { 
                                                e.stopPropagation();  // Prevent triggering the profile click when following
                                                handleFollow(resultUser.id);
                                            }}>Follow</button>
                                        </div>
                                    </div >
                                ))
                            ) : (
                                <p>No users found</p>
                            )}
                        </ul>
      </div>
    </div>
  );
}

export default Home;
