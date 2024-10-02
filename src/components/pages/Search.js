import { useState } from 'react';
import '../css/Search.css';
import Nav from './Nav';

function Search() {
    const [searchTerm, setSearchTerm] = useState(''); // Initialize with an empty string
    const [searchResults, setSearchResults] = useState([]); // Store search results
    const [isLoading, setIsLoading] = useState(false); // Handle loading state

    const handleInputChange = async (event) => {
        const value = event.target.value;
        setSearchTerm(value);

        if (value.trim() === "") {
            setSearchResults([]); // Clear results if search term is empty
            return;
        }

        // Call the backend search API
        setIsLoading(true);
        try {
            const response = await fetch(`/api/social_media/search_users?searchTerm=${value}`);
            const data = await response.json();
            setSearchResults(data); // Update search results with fetched data
        } catch (error) {
            console.error("Error searching for users:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="search-page">
            <div className='nav-container'>
                <Nav />
            </div>
            <div className="search-container">
                <div className="search-bar">
                    <input
                        id="search"
                        type="text"
                        name="search"
                        placeholder="Search"
                        value={searchTerm}  // Bind input value to state
                        onChange={handleInputChange}  // Handle input change
                        required
                    />
                    {searchTerm && <button className="clear-btn" onClick={() => setSearchTerm('')}>✕</button>}
                </div>

                <div className="search-results">
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : (
                        <ul>
                            {searchResults.map((user) => (
                                <li key={user._id} className="search-result-item">
                                    <div>
                                        <img 
                                            src={user.profilePic || '/default-profile.png'} 
                                            alt={user.username} 
                                            className="profile-pic"
                                        />
                                        <div className="user-info">
                                            <p className="username">{user.username}</p>
                                            <p className="full-name">{user.fullName}</p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Search;
