import React, { useState, useEffect } from 'react';
import axios from 'axios';
import redHeartIcon from '../assets/icons/liked.png';
import whiteHeartIcon from '../assets/icons/like.png';

const LikeButton = ({ postId, userId }) => {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const fetchLikeStatus = async () => {
      try {
        const response = await axios.get('https://socialmedia-apis-2.onrender.com/api/social_media/post/like/status', {
          params: { postId, userId },
        });
        setLiked(response.data.liked);
      } catch (error) {
        console.error('Error fetching like status:', error);
      }
    };

    fetchLikeStatus();
  }, [postId, userId]);

  const toggleLike = async () => {
    try {
      // Call the like API
      const response = await axios.post('https://socialmedia-apis-2.onrender.com/api/social_media/post/like', {
        postId,
        userId,
      });

      // Update the like status based on the response
      setLiked(!liked);
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  return (
    <button onClick={toggleLike} style={{ background: 'none', border: 'none' }}>
      <img
        src={liked ? redHeartIcon : whiteHeartIcon}
        alt="Heart Icon"
        style={{ width: '24px', height: '24px' }}
      />
    </button>
  );
};

export default LikeButton;
