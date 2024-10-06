import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/Home.css';
import Nav from './Nav';
import StoryView from './StoryView';


// Sample story content (you can replace it with actual data or API calls)
const storyData = {
  story1: { title: 'Story 1', username: 'Mohit Karekar' },
  story2: { title: 'Story 2', username: 'John Doe' },
  story3: { title: 'Story 3', username: 'Jane Smith' },
  story4: { title: 'Story 4', username: 'Alice Johnson' },
};

function Home() {
  

  return (
    <div className="home-container">
      {/* Sidebar */}
      <Nav />

      {/* Main Feed */}
      <div className="main-feed">
        {/* Stories */}
        <div className="stories">
          {/* Use Link to navigate to StoryView */}
          <Link to={StoryView} className="story">Story 1</Link>
          <Link to="/story/story2" className="story">Story 2</Link>
          <Link to="/story/story3" className="story">Story 3</Link>
          <Link to="/story/story4" className="story">Story 4</Link>
        </div>

        {/* Post */}
        <div className="post">
          <div className="post-header">
            <div className="profile-picture"></div>
            <div className="profile-info">
              <p>tartinebakery</p>
              <span>San Francisco, California</span>
            </div>
          </div>
          <div className="post-image">
            <img src="your_image_url_here" alt="Pie" />
          </div>
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
