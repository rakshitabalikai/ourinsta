import '../css/Home.css'
import home from '../assets/icons/home.png';
import search from '../assets/icons/search.png'
import explore from '../assets/icons/explore.png'
import reels from '../assets/icons/reels.png'
import messages from '../assets/icons/messages.png'
import notifications from '../assets/icons/notifications.png'
import create from '../assets/icons/create.png'
import profile from '../assets/icons/profile.png'
import hamburger from '../assets/icons/hamburger.png'



const posts = [
    { username: 'user1', imageUrl: 'https://via.placeholder.com/300' },
    { username: 'user2', imageUrl: 'https://via.placeholder.com/300' },
];

function Home(){
    return(
        <div className='Homecontainer'>
                <div className="menu">
                    <button type="button" className='menubuttons'><img src={home}></img>Home</button>
                    <button type="button" className='menubuttons'><img src={search}></img>Search</button>
                    <button type="button" className='menubuttons'><img src={explore}></img>Explore</button>
                    <button type="button" className='menubuttons'><img src={reels}></img>Reels</button>
                    <button type="button" className='menubuttons'><img src={messages}></img>Messages</button>
                    <button type="button" className='menubuttons'><img src={notifications}></img>Notifications</button>
                    <button type="button" className='menubuttons'><img src={create}></img>Create</button>
                    <button type="button" className='menubuttons'><img src={profile}></img>Profile</button>
                    <button type="button" className='menubuttons'><img src={hamburger}></img>More</button>  
                </div>    
            <div className='homesection2'>

            </div>
            <div className='homesection3'>
                <div className='homesection3_1'>
                    <button type="button" className='profilebutton'><img src={profile}></img>Profile</button>
                    <button type="button" className='switch'>Switch</button>
                </div>
                <div className='homesection3_2'>
                    <div className='homesection3_1'>
                    <h3 className='suggforu'>Suggested for you</h3>
                    <button type="button" className='switch'>see all</button>
                    </div>
                </div>
  
            </div>
        
</div>  
    );
}
export default Home;