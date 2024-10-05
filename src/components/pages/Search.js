import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate hook
import '../css/Search.css';
import Nav from './Nav';

function Search() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    
    const [user, setUser] = useState(null);
    const [profilepic, setProfilePic] = useState('https://via.placeholder.com/150');

    const navigate = useNavigate();  // Initialize useNavigate

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            console.log(parsedUser);
            setUser(parsedUser);
            setProfilePic(parsedUser.profile_pic || 'https://via.placeholder.com/150');
        }
    }, []);

    const handleInputChange = async (event) => {
        const value = event.target.value;
        setSearchTerm(value);

        if (value.trim() === "") {
            setSearchResults([]);
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch(`http://localhost:5038/api/social_media/search?query=${value}`);
            const data = await response.json();

            if (response.ok) {
                setSearchResults(data.users);
            } else {
                setSearchResults([]);
                console.error(data.message);
            }
        } catch (error) {
            console.error("Error searching for users:", error);
            setSearchResults([]);
        } finally {
            setIsLoading(false);
        }
    };

    // Function to handle follow
    const handleFollow = async (user_id) => {
        if (!user) {
            console.error("No logged-in user found");
            return;
        }

        const followData = {
            follower: user.id,   // Current logged-in user
            user_id: user_id,    // User to be followed
        };

        try {
            const response = await fetch('http://localhost:5038/api/social_media/follow', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(followData),
            });

            const data = await response.json();
            if (response.ok) {
                console.log("Following:", data.message);
                alert(`You are now following ${user_id}`);
            } else {
                console.error("Failed to follow:", data.message);
                alert(data.message);
            }
        } catch (error) {
            console.error("Error following user:", error);
        }
    };

    // Navigate to the user's profile page
    const handleProfileClick = (user_id) => {
        navigate(`/otherprofile/${user_id}`);  // Redirect to /profile/:user_id
    };

    return (
        <div className="search-page">
            <Nav />
            <div className="search-container">
                <div className="search-bar">
                    <input
                        id="search"
                        type="text"
                        name="search"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={handleInputChange}
                        required
                    />
                    {searchTerm && <button className="clear-btn" onClick={() => setSearchTerm('')}>✕</button>}
                </div>
                <div className="search-results">
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : (
                        <ul>
                            {searchResults.length > 0 ? (
                                searchResults.map((resultUser) => (
                                    <div 
                                        key={resultUser.id} 
                                        className="search-result-item"
                                        onClick={() => handleProfileClick(resultUser.id)} // Redirect on click
                                    >
                                        <div className='usercard'>
                                            <img 
                                                src={resultUser.profile_pic}
                                                alt={resultUser.username} 
                                                className="profile-pic"
                                            />
                                            <div className="user-info">
                                                <p className="username">{resultUser.username}</p>
                                                <p className="full-name">{resultUser.fullName}</p>
                                            </div>
                                            <button onClick={(e) => { 
                                                e.stopPropagation();  // Prevent triggering the profile click when following
                                                handleFollow(resultUser.id);
                                            }}>Follow</button>
                                        </div>
                                    </div >
                                ))
                            ) : (
                                <p>No users found</p>
                            )}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Search;
