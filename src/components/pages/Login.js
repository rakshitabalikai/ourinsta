import '../css/Login.css';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // For navigation
import { Link,Outlet } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({
    mobileOrEmail: '',
    password: ''
  });
  const navigate = useNavigate(); // Initialize navigate function

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://socialmedia-apis-2iv6.onrender.com/api/social_media/login', formData);
      alert(response.data.message);

      // Store user data in local storage
      localStorage.setItem('user', JSON.stringify(response.data.user));

      // Redirect to profile page
      navigate('/profile');
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div>
      <div className="main-container-login">
        <div className="box1">
          <div className="heading">
            {/* <h1 className="instagram-logo">Instagram</h1> */}
            {/* <video autoplay muted loop id="background-video"> */}
    {/* <source src="path_to_your_video.mp4" type="video/mp4"> */}
    {/* Your browser does not support the video tag. */}
  {/* </video> */}

          </div>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className='field'>
              <input id='mobileOrEmail' type="text" name="mobileOrEmail" value={formData.mobileOrEmail} onChange={handleChange} required />
              <label htmlFor='mobileOrEmail'>Mobile Number or Email</label>
            </div>
            <div className='field'>
              <input id='password' type="password" name="password" value={formData.password} onChange={handleChange} required />
              <label htmlFor='password'>Password</label>
            </div>
            <button className="login-button" title="login">Log In</button>
          </form>
        </div>
        <div className="box2">
          <p>Don't have an account? <Link to={"/signup"} className="signup1">Sign Up</Link></p>
        </div>
      </div>
      <Outlet></Outlet>
    </div>
  );
}

export default Login;
