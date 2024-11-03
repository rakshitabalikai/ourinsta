import Nav from "./Nav";
import "../css/Reels.css";
import { useState, useEffect } from "react";
import like from '../assets/icons/liked.png';
import comment from '../assets/icons/comment.png';

function Reels() {
    const [clips, setClips] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
        }
    }, []);

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
                                <video autoPlay loop muted controls>
                                    <source src={`http://localhost:5038${post.fileUrl}`} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                            <div className='postDescription'>
                                <p className='captions'>{post.caption}</p>
                                <div className='likeandcomment'>
                                    <button className='menu-button'><img src={comment} alt="Comment" /></button>
                                    <button className='menu-button'><img src={like} alt="Like" /></button>
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
