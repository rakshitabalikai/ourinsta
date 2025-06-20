import Nav from "./Nav";
import { useEffect, useState } from "react";
import like from '../assets/icons/liked.png';
import comment from '../assets/icons/comment.png';
import '../css/Explore.css';

function Explore() {
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
        }
    }, []);

    // Fetch posts when the component mounts
    useEffect(() => {
        fetch('https://socialmedia-apis-2.onrender.com/api/social_media/posts')
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
        <div className="explorecontainer">
            <div className="explorenav">
                <Nav />
            </div>
            <div className="exploreposts">
                {posts.length > 0 ? (
                    posts.map((post, index) => (
                        <div key={index} className="explorepost">
                            <div className="post-image1">
                                {/* Use fileUrl to load image or video */}
                                {post.mediaType === 'image' ? (
                                    <img className="post-image2" src={`http://localhost:5038${post.fileUrl}`} alt={post.caption} />
                                ) : (
                                    <video className="post-video2" autoPlay loop muted>
                                        <source   src={`http://localhost:5038${post.fileUrl}`} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                )}
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

export default Explore;
