import '../css/Home.css'
import Nav from './Nav';



const posts = [
    { username: 'user1', imageUrl: 'https://via.placeholder.com/300' },
    { username: 'user2', imageUrl: 'https://via.placeholder.com/300' },
];

function Home(){
    return(
        <div className="home-container">
      {/* Sidebar */}
      <Nav></Nav>

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