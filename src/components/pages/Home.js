import '../css/Home.css'
import home from '../assets/icons/home.png';
import search from '../assets/icons/search.png';
import explore from '../assets/icons/explore.png';
import reels from '../assets/icons/reels.png';
import messages from '../assets/icons/messages.png';
import notifications from '../assets/icons/notifications.png';
import create from '../assets/icons/create.png';
import profileIcon from '../assets/icons/profile.png';
import hamburger from '../assets/icons/hamburger.png';


const posts = [
    { username: 'user1', imageUrl: 'https://via.placeholder.com/300' },
    { username: 'user2', imageUrl: 'https://via.placeholder.com/300' },
];

function Home(){
    return(
        <div className="home-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h1>Instagram</h1>
        <ul>
        <button className='menu-button'><img src={home} alt="Home" /> Home</button>
        <button className='menu-button'><img src={search} alt="Search" /> Search</button>
        <button className='menu-button'><img src={explore} alt="Explore" /> Explore</button>
        <button className='menu-button'><img src={reels} alt="Reels" /> Reels</button>
        <button className='menu-button'><img src={messages} alt="Messages" /> Messages</button>
        <button className='menu-button'><img src={notifications} alt="Notifications" /> Notifications</button>
        <button className='menu-button'><img src={create} alt="Create" /> Create</button>
        <button className='menu-button'><img src={profileIcon} alt="Profile" /> Profile</button>
        <button className='menu-button'><img src={hamburger} alt="More" /> More</button>
        </ul>
      </div>

      {/* Main Feed */}
      <div className="main-feed">
        <div className="stories">
          <div className="story">Story 1</div>
          <div className="story">Story 2</div>
          <div className="story">Story 3</div>
          <div className="story">Story 4</div>
        </div>

        <div className="post">
          <div className="post-header">
            <div className="profile-picture"></div>
            <div className="profile-info">
              <p>tartinebakery</p>
              <span>San Francisco, California</span>
            </div>
          </div>
          <div className="post-image">
            <img src="your_image_url_here" alt="Pie" />
          </div>
        </div>
      </div>

      {/* Suggestions */}
      <div className="suggestions">
        <p>Suggestions For You</p>
        <ul>
        <div className="follower-picture"><li>alex.anyways18 - <li id='follow'>Follow</li></li>  </div>
        <div className="follower-picture"><li>chantoulflowergirl - Follow</li></div>  
        <div className="follower-picture"> <li>gwangu77 - Follow</li></div> 
        <div className="follower-picture"><li>mishka_songs - Follow</li></div>  
        <div className="follower-picture"> <li>pierre_thecomet - Follow</li></div> 
        </ul>
      </div>
    </div>
    );
}
export default Home;