import Nav from "./Nav";
import "../css/Reels.css"
import { useState, useEffect } from "react";
import like from '../assets/icons/liked.png'
import comment from '../assets/icons/comment.png'


function Reels() {
    const[clips, setclips] = useState([]);
    const [user, setUser] = useState(null);
    console.log("this is reels")
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          console.log(parsedUser);
          setUser(parsedUser);
        }
      }, []); 

      useEffect(() => {
        // Fetch posts from API
        fetch('http://localhost:5038/api/social_media/posts/videos')
          .then(response => {
            if (response.headers.get('content-type').includes('application/json')) {
              return response.json(); 
            } else {
              throw new Error('Posts response is not JSON');
            }
          })
          .then(data => setclips(data))
          .catch(error => {
            console.error('Error fetching posts:', error);
            alert('Failed to load posts');
          });
      }, []);


    return(
        <div className="reels_container">
            <Nav></Nav>
            <div className="posts">
          {clips.length > 0 ? (
            clips.map((post, index) => (
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
    )
}

export default Reels;