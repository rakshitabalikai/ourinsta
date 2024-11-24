import React from 'react';
import { useParams } from 'react-router-dom';
import "../css/Storyview.css";

// Story data with mixed content (images or videos)
const storyData = {
  story1: { 
    username: 'Mohit Karekar',
    profilePic: 'https://via.placeholder.com/40', // Replace with actual URL
    mediaUrl: 'https://your_image_url_here.jpg', // Replace with actual media URL (image or video)
    mediaType: 'image', // Change to 'video' for videos
    timestamp: 'Posted 32m ago', 
  },
  story2: { 
    username: 'John Doe',
    profilePic: 'https://via.placeholder.com/40',
    mediaUrl: 'https://your_video_url_here.mp4', // Replace with actual video URL
    mediaType: 'video',
    timestamp: 'Posted 1h ago', 
  },
  // Add more stories as needed
};

function Storyview() {
  const { storyId } = useParams();
  const story = storyData[storyId];

  if (!story) {
    return <div>Story not found</div>;
  }

  return (
    
    <div className="story-view">

        <div>
            <h1>
                This page allow you to see other's stories
            </h1>
        </div>
      {/* Header */}
      <div className="story-header">
        <img src={story.profilePic} alt={story.username} className="story-profile-pic" />
        <div className="story-info">
          <h3>{story.username}</h3>
          <p>{story.timestamp}</p>
        </div>
      </div>

      {/* Media content (image or video) */}
      <div className="story-media">
        {story.mediaType === 'image' ? (
          <img src={story.mediaUrl} alt="Story" className="story-image" />
        ) : (
          <video className="story-video" controls>
            <source src={story.mediaUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>
    </div>
  );
}

// export default StoryView;
export default Storyview;