import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/Home.css';
import Nav from './Nav';

function Home() {
  const [posts, setPosts] = useState([]);
  const [stories, setStories] = useState([]);

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

  return (
    <div className="home-container">
      {/* Sidebar */}
      <Nav />

      {/* Main Feed */}
      <div className="main-feed">
        {/* Stories */}
        <div className="stories">
          {stories.length > 0 ? (
            stories.map((story, index) => (
              <Link key={index} to={`/story/${story._id}`} className="story">
                {story.title} by {story.username}
              </Link>
            ))
          ) : (
            <p>No stories available.</p>
          )}
        </div>

        {/* Post */}
        <div className="posts">
          {posts.length > 0 ? (
            posts.map((post, index) => (
              <div key={index} className="post">
                <div className="post-header">
                  <div className="profile-picture"></div>
                  <div className="profile-info">
                    <p>{post.username}</p>
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
                <p>{post.caption}</p>
              </div>
            ))
          ) : (
            <p>No posts available.</p>
          )}
        </div>
      </div>

      {/* Suggestions */}
      <div className="suggestions">
        <p>Suggestions For You</p>
        <ul>
          <div className="follower-picture"><li>alex.anyways18 - <li id='follow'>Follow</li></li></div>
          <div className="follower-picture"><li>chantoulflowergirl - Follow</li></div>
          <div className="follower-picture"><li>gwangu77 - Follow</li></div>
          <div className="follower-picture"><li>mishka_songs - Follow</li></div>
          <div className="follower-picture"><li>pierre_thecomet - Follow</li></div>
        </ul>
      </div>
    </div>
  );
}

export default Home;
