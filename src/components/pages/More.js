import Nav from './Nav';
import '../css/More.css';
import { Link } from 'react-router-dom';
import search from '../assets/icons/search.png';
import { useNavigate } from 'react-router-dom';


function More(){
    const navigate = useNavigate();
    
    const Logout = (e) => {
        localStorage.removeItem('user');
        navigate('/')
    }

    return(
        <div>
           <div className='more-container'>
                <Nav />
                <div className='more-collector'>
                    <div className='more-nav'>
                        <Link to={"/More"}><button className='menu-button'> Report</button></Link>
                        <Link to={"/More"}><button className='menu-button'> Block</button></Link>
                        <Link to={"/More"}><button className='menu-button'> Reset password</button></Link>
                        <Link to={"/More"}><button className='menu-button'> About-us</button></Link>
                        <button onClick={Logout} className='menu-button'> Log-out</button>
                    </div>
                </div>
           </div> 
        </div>
    );
}
export default More;