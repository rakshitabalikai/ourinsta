import React, { useState, useEffect } from 'react';
import Nav from './Nav';
import axios from 'axios';
import '../css/More.css';
import { Link, useNavigate } from 'react-router-dom';
import Input from './Comment';
import RequestReset from './Resentpasswordrequest';

function More() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [user, setUser] = useState(null);
    const [activeOption, setActiveOption] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [feedback, setFeedback] = useState('');
    const [reportedUserId, setReportedUserId] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
        }
    }, []);

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
      
    const handleProfileClick = (user_id) => {
        navigate(`/otherprofile/${user_id}`);  // Redirect to /profile/:user_id
    };
    const Logout = () => {
        localStorage.removeItem('user');
        navigate('/');
    };

    const handleInputChange = async (event) => {
        const value = event.target.value;
        setSearchTerm(value);

        if (value.trim() === '') {
            setSearchResults([]);
            return;
        }

        setIsLoading(true);
        try {
            const response = await axios.get(`http://localhost:5038/api/social_media/search`, {
                params: { query: value },
            });

            setSearchResults(response.data.users || []);
        } catch (error) {
            console.error('Error searching for users:', error);
            setSearchResults([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);

            const reader = new FileReader();
            reader.onload = () => setPreview(reader.result);
            reader.readAsDataURL(selectedFile);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage('');
        setErrorMessage('');

        if (!file || !feedback || !reportedUserId || !user) {
            setErrorMessage('Please fill all fields and select a screenshot.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('reporter_id', user.id);
        formData.append('reported_user_id', reportedUserId);
        formData.append('feedback', feedback);

        try {
            const response = await axios.post('http://localhost:5038/api/social_media/report', formData);

            if (response.status === 201) {
                setSuccessMessage('Report submitted successfully!');
                setFile(null);
                setPreview(null);
                setFeedback('');
                setReportedUserId('');
                setSearchTerm('');
            }
        } catch (error) {
            console.error('Error submitting report:', error);
            setErrorMessage(error.response?.data?.message || 'Failed to submit the report.');
        }
    };

    const renderContent = () => {
        switch (activeOption) {
            case 'report':
                return (
                    <div className="content-section-report">
                        <h1 className="content-section-report" style={{ marginLeft:'50px' }}>Report a User</h1>
                        <form onSubmit={handleSubmit}>
                            <div >
                                <label>Select Screenshot:</label>
                                <input className='ss-report' type="file" accept="image/*" onChange={handleFileChange} required />
                            </div>

                            {preview && (
                                <div className="preview-container">
                                    <h3>Preview:</h3>
                                    <img src={preview} alt="Screenshot Preview" />
                                </div>
                            )}

                            <div className="input-field">
                                <label>Search User to Report:</label>
                                <div >
                                    <input
                                        className="search-bar-more"
                                        type="text"
                                        placeholder="Search for a user"
                                        value={searchTerm}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    {searchTerm && (
                                        <button
                                            className="clear-btn"
                                            onClick={() => {
                                                setSearchTerm('');
                                                setSearchResults([]);
                                            }}
                                        >
                                            ✕
                                        </button>
                                    )}
                                </div>
                                <div className="search-results">
                                    {isLoading ? (
                                        <p>Loading...</p>
                                    ) : searchResults.length > 0 ? (
                                        <ul>
                                            {searchResults.map((resultUser) => (
                                                <li
                                                    key={resultUser.id}
                                                    className={`search-result-item ${
                                                        reportedUserId === resultUser.id ? 'selected' : ''
                                                    }`}
                                                    onClick={() => setReportedUserId(resultUser.id)}
                                                >
                                                    <img
                                                        src={resultUser.profile_pic || 'https://via.placeholder.com/150'}
                                                        alt={resultUser.username}
                                                        className="profile-pic"
                                                    />
                                                    <div>
                                                        <p className="username">{resultUser.username}</p>
                                                        <p className="full-name">{resultUser.fullName}</p>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p>No users found</p>
                                    )}
                                </div>
                            </div>

                            <div >
                                <label >Feedback:</label>
                                
                                <textarea
                                    className="report-feedback"
                                    value={feedback}
                                    onChange={(e) => setFeedback(e.target.value)}
                                    placeholder="Describe the issue..."
                                    required
                                ></textarea>
                            </div>

                            <button className="report-button" type="submit">
                                Submit Report
                            </button>
                        </form>

                        {successMessage && <p className="success-message">{successMessage}</p>}
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                    </div>
                );
            case 'block':
                return <div >
                <div className="content-sectionblock">
                <h1 style={{ color: '#8e0038', marginLeft:'50px' }}>Block an User</h1>
                    <div className="search-container-block">
                    <div className="search-bar-more-block" >
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
            case 'reset':
                return <div className="content-section">
                <RequestReset></RequestReset>
                </div>;
            case 'about':
                return <div className="content-section">About Us section content here</div>;
            default:
                return <div className="content-section">Please select an option to view details.</div>;
        }
    };

    return (
        <div className="more-container">
            <Nav />
            <div className="more-collector">
                <div className="more-nav">
                    <button className="menu-button" onClick={() => setActiveOption('report')}>Report</button>
                    <button className="menu-button" onClick={() => setActiveOption('block')}>Block</button>
                    <button className="menu-button" onClick={() => setActiveOption('reset')}>Reset password</button>
                    <Link to={"/about_us"} className="menu-button">About-us</Link>
                    <button onClick={Logout} className="menu-button">Log-out</button>
                </div>
                <div className="more-content">{renderContent()}</div>
            </div>
        </div>
    );
}

export default More;
