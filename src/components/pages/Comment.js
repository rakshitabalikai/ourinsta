import React, { useState } from 'react';
import styled from 'styled-components';
import commentIcon from '../assets/icons/comment.png';
import axios from 'axios';

const Input = ({ user_id, post_id }) => {
  const [comment, setComment] = useState('');
  console.log(user_id);
  const handleKeyDown = async (event) => {
    if (event.key === 'Enter' && comment.trim() !== '') {
      try {
        const payload = { user_id, post_id, comment };
        console.log("Payload being sent:", payload);
  
        const response = await axios.post('http://localhost:5038/api/social_media/comments', payload);
        console.log('Comment successfully saved:', response.data);
        setComment('');
      } catch (error) {
        console.error('Error saving comment:', error);
      }
    }
  };
  

  return (
    <StyledWrapper>
      <div className="container">
        <input
          type="text"
          name="text"
          className="input"
          placeholder="Comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <div className="icon">
          <img src={commentIcon} alt="Comment Icon" />
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .container {
    position: relative;
    --size-button: 40px;
    color: white;
  }

  .input {
    padding-left: var(--size-button);
    height: var(--size-button);
    font-size: 15px;
    border: none;
    color: #fff;
    outline: none;
    width: var(--size-button);
    transition: all ease 0.3s;
    background-color: #191A1E;
    box-shadow: 1.5px 1.5px 3px #0e0e0e, -1.5px -1.5px 3px rgb(95 94 94 / 25%), inset 0px 0px 0px #0e0e0e, inset 0px -0px 0px #5f5e5e;
    border-radius: 50px;
    cursor: pointer;
  }

  .input:focus,
  .input:not(:invalid) {
    width: 200px;
    cursor: text;
    box-shadow: 0px 0px 0px #0e0e0e, 0px 0px 0px rgb(95 94 94 / 25%), inset 1.5px 1.5px 3px #0e0e0e, inset -1.5px -1.5px 3px #5f5e5e;
  }

  .container .icon {
    position: absolute;
    width: var(--size-button);
    height: var(--size-button);
    top: 0;
    left: 0;
    padding: 8px;
    pointer-events: none;
  }

  .container .icon img {
    width: 100%;
    height: 100%;
  }
`;

export default Input;
