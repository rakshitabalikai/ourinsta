// StoryView.jsx
import React from 'react';
import '../css/Storyview.css';

const Storyview = ({ user, story, closeStory }) => {
  return (
    <div className="story-view-container">
      <div className="story-header">
        <div className="user-info">
          <img className="user-avatar" src={user.profilePicture} alt={user.name} />
          <div>
            <p className="user-name">{user.name}</p>
            <p className="time-posted">{story.timeAgo} ago</p>
          </div>
        </div>
        <button onClick={closeStory} className="close-btn">X</button>
      </div>

      <div className="story-content">
        <img src={story.content} alt="story" className="story-image" />
      </div>
    </div>
  );
};

export default Storyview;
