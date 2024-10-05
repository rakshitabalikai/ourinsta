import React, { useState } from 'react';
import '../css/Home.css';
import Nav from './Nav';


// Sample story content (you can replace it with actual data or API calls)
const storyData = {
  story1: { 
    username: 'Mohit Karekar',
    profilePic: 'https://via.placeholder.com/40', // Add a profile picture URL here
    imageUrl: 'your_story_image_url_here', // Add the URL of the story image here
    timestamp: 'Posted 32m ago', },
  story2: { title: 'Story 2', content: 'This is the content of Story 2' },
  story3: { title: 'Story 3', content: 'This is the content of Story 3' },
  story4: { title: 'Story 4', content: 'This is the content of Story 4' },
};

function Home() {
  // State to track the currently selected story
  const [selectedStory, setSelectedStory] = useState(null);

  return (
    <div className="home-container">
      {/* Sidebar */}
      <Nav />

      {/* Main Feed */}
      <div className="main-feed">
        {/* Stories */}
        <div className="stories">
          <div className="story" onClick={() => setSelectedStory('story1')}>Story 1</div>
          <div className="story" onClick={() => setSelectedStory('story2')}>Story 2</div>
          <div className="story" onClick={() => setSelectedStory('story3')}>Story 3</div>
          <div className="story" onClick={() => setSelectedStory('story4')}>Story 4</div>
        </div>

        {/* Show Selected Story */}
        {selectedStory && (
          <div className="story-content">
            <h2>{storyData[selectedStory].title}</h2>
            <p>{storyData[selectedStory].content}</p>
          </div>
        )}

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
