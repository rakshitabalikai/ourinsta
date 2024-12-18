import { Link,Outlet } from 'react-router-dom';
import '../css/Nav.css';
import home from '../assets/icons/home.png';
import search from '../assets/icons/search.png';
import explore from '../assets/icons/explore.png';
import reels from '../assets/icons/reels.png';
import messages from '../assets/icons/messages.png';
import notifications from '../assets/icons/notifications.png';
import create from '../assets/icons/create.png';
import profileIcon from '../assets/icons/profile.png';
import hamburger from '../assets/icons/hamburger.png';



function Nav(){
    return(
        <div className="menu">
        <Link to={"/home"}><button className='menu-button'><img src={home} alt="Home" /> Home</button></Link>
        <Link to={"/search"}><button className='menu-button'><img src={search} alt="Search" /> Search</button></Link> 
        <Link to={"/Explore"}><button className='menu-button'><img src={explore} alt="Explore" /> Explore</button></Link>
        <Link to={"/Reels"}><button className='menu-button'><img src={reels} alt="Reels" /> Clip</button></Link> 
        <Link to={"/messages"}><button className='menu-button'><img src={messages} alt="Messages" /> Messages</button></Link>
        <Link to={"/Notification"}><button className='menu-button'><img src={notifications} alt="Notifications" /> Notifications</button></Link>
        <Link to={"/create"}><button className='menu-button'><img src={create} alt="Create" /> Create</button></Link>
        <Link to={"/profile"}><button className='menu-button'><img src={profileIcon} alt="Profile" /> Profile</button></Link>
        <Link to={"/More"}><button className='menu-button'><img src={hamburger} alt="More" /> More</button></Link>
        <Outlet></Outlet>
      </div>
    )
}

export default Nav;