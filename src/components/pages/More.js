import React, { useState,useEffect } from 'react';
import Nav from './Nav';
import axios from 'axios';
import '../css/More.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function More() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [user, setUser] = useState(null);
    const [activeOption, setActiveOption] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const Logout = (e) => {
        localStorage.removeItem('user');
        navigate('/');
    };
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            console.log(parsedUser);
            setUser(parsedUser);
            // setProfilePic(parsedUser.profile_pic || 'https://via.placeholder.com/150');
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
    const handleProfileClick = (user_id) => {
        navigate(`/otherprofile/${user_id}`);  // Redirect to /profile/:user_id
    };

    const handleBlockUser = async (blockedId) => {
        const storedUser = JSON.parse(localStorage.getItem('user')); // Get logged-in user info
        const blockerId = user.id; // Assuming `_id` is the logged-in user's ID
      
        try {
          const response = await axios.post('http://localhost:5038/api/social_media/user/blockuser', {
            blockerId,
            blockedId,
          });
      
          if (response.status === 201) {
            alert('User blocked successfully');
            // Optionally, refresh the search results or update UI
          }
        } catch (error) {
          console.error('Error blocking user:', error);
          alert(error.response?.data?.message || 'Failed to block user');
        }
      };
      

    const renderContent = () => {
        switch (activeOption) {
            case 'block':
                return <div className="content-section">
                                <div className="content-section">
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
                                                <div className="usercard">
                                                    <img
                                                    src={resultUser.profile_pic}
                                                    alt={resultUser.username}
                                                    className="profile-pic"
                                                    />
                                                    <div className="user-info">
                                                    <p className="username">{resultUser.username}</p>
                                                    <p className="full-name">{resultUser.fullName}</p>
                                                    </div>
                                                    <button
                                                    onClick={(e) => {
                                                        e.stopPropagation(); // Prevent triggering the profile click when blocking
                                                        handleBlockUser(resultUser.id); // Call block handler
                                                    }}
                                                    >
                                                    Block
                                                    </button>
                                                </div>
                                                </div>
                                            ))
                                            ) : (
                                            <p>No users found</p>
                                            )}
                                        </ul>
                                        )}
                                    </div>
                                    </div>
                                </div>
                         </div>;
            case 'report':
                return <div className="content-section">This is the Block section content.</div>;
            case 'reset':
                return <div className="content-section">This is the Reset Password section content.</div>;
            case 'about':
                return <div className="content-section">This is the About Us section content.</div>;
            default:
                return <div className="content-section">Please select an option to view details.</div>;
        }
    };

    return (
        <div>
            <div className='more-container'>
                <Nav />
                <div className='more-collector'>
                    <div className='more-nav'>
                        <button className='menu-button' onClick={() => setActiveOption('report')}>Report</button>
                        <button className='menu-button' onClick={() => setActiveOption('block')}>Block</button>
                        <button className='menu-button' onClick={() => setActiveOption('reset')}>Reset password</button>
                        <button className='menu-button' onClick={() => setActiveOption('about')}>About-us</button>
                        <button onClick={Logout} className='menu-button'>Log-out</button>
                    </div>
                    {/* Content displayed beside the menu */}
                    <div className="more-content">
                        {renderContent()}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default More;
