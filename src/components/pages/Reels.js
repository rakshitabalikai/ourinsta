import Nav from "./Nav";
import "../css/Reels.css";
import { useState, useEffect } from "react";
import like from '../assets/icons/liked.png';
import comment from '../assets/icons/comment.png';
import Input from './Comment';
import LikeButton from './Like';

function Reels() {
    const [clips, setClips] = useState([]);
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [userid,setuserid] = useState();
    
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          console.log(parsedUser);
          setUser(parsedUser);
          setuserid(parsedUser.id);
        }
      }, []);

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
      const handleLike = async (postId) => {
        if (!user) {
          alert("You must be logged in to like posts.");
          return;
        }
      
        const likeData = {
          postId: postId, // ID of the post being liked/unliked
          userId: user.id, // Current logged-in user's ID
        };
        console.log('likeData',likeData);
      
        try {
          const response = await fetch('http://localhost:5038/api/social_media/post/like', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(likeData),
          });
      
          const data = await response.json();
          if (response.ok) {
            // alert(data.message); // Display the server's response message (e.g., "Post liked" or "Like removed")
      
            // Update the local state (optional)
            setPosts((prevPosts) =>
              prevPosts.map((post) =>
                post._id === postId
                  ? { ...post, liked: !post.liked } // Toggle the `liked` state
                  : post
              )
            );
          } else {
            alert(`Error: ${data.message}`);
          }
        } catch (error) {
          console.error('Error liking/unliking the post:', error);
          alert('An error occurred while liking/unliking the post.');
        }
      };

    
    useEffect(() => {
        // Fetch video posts from API
        fetch('http://localhost:5038/api/social_media/posts/videos')
            .then(response => {
                if (response.headers.get('content-type').includes('application/json')) {
                    return response.json();
                } else {
                    throw new Error('Posts response is not JSON');
                }
            })
            .then(data => setClips(data))
            .catch(error => {
                console.error('Error fetching posts:', error);
                alert('Failed to load posts');
            });
    }, []);

    return (
        <div className="reels_container">
            <Nav />
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
                  {/* Use the fileUrl for images or videos */}
                  {post.mediaType === 'image' ? (
                    <img src={`http://localhost:5038${post.fileUrl}`} alt={post.caption} />
                  ) : (
                    <video controls autoPlay loop muted>
                      <source src={`http://localhost:5038${post.fileUrl}`} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>
                <div className='postDescription'>
                  <p className='captions'>{post.caption}</p>
                  <div className='likeandcomment'>
                        {/* <div class="container"> */}
                        <button className="menu-button" onClick={() => handleLike(post._id)}><LikeButton postId={post._id} userId={userid}></LikeButton></button>
                        <Input user_Id={userid} post_id={post._id} />

                        {/* </div>                */}
                    
                      
                    

                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No posts available.</p>
          )}
        </div>

        </div>
    );
}

export default Reels;
