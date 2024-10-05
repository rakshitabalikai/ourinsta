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
            const response = await fetch(`http://localhost:5038/api/social_media/search?query=${value}`); // Updated endpoint to match the API
            const data = await response.json();

            if (response.ok) {
                setSearchResults(data.users); // Update search results with the users array from the response
            } else {
                setSearchResults([]); // Clear results if no users found
                console.error(data.message); // Log error message for debugging
            }
            console.log(searchResults);
        } catch (error) {
            console.error("Error searching for users:", error);
            setSearchResults([]);
        } finally {
            setIsLoading(false);
        }
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
                            {searchResults.length > 0 ? (
                                searchResults.map((user) => (
                                    <div key={user.id} className="search-result-item">
                                        <div className='usercard'>
                                            <img 
                                                src={user.profile_pic} // Ensure profile_pic is used from the API
                                                alt={user.username} 
                                                className="profile-pic"
                                            />
                                            <div className="user-info">
                                                <p className="username">{user.username}</p>
                                                <p className="full-name">{user.fullName}</p>
                                            </div>
                                            <button>Follow</button>
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
