import '../css/Login.css';
import logo from "../assets/logo/logo.png"
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link, Outlet } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({
    mobileOrEmailOrUsername: '',
    password: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is already logged in
    const user = localStorage.getItem('user');
    if (user) {
      navigate('/home'); // Redirect to the home page if user is found
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://socialmedia-apis-2.onrender.com/api/social_media/login', formData);
      alert(response.data.message);
      console.log(response);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      navigate('/profile');
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className='container_login'>
      <div className="main-container-login">
        <div className="box1">
          <div className="heading">
            <img src={logo} className="logo" alt="logo" />
          </div>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className='field'>
              <label htmlFor='mobileOrEmailOrUsername'>Username, Email or Mobile</label>
              <input
                id='mobileOrEmailOrUsername'
                type="text"
                name="mobileOrEmailOrUsername"
                placeholder='Mobile/Email/Username'
                value={formData.mobileOrEmailOrUsername}
                onChange={handleChange}
                required
              />
            </div>
            <div className='field'>
              <label htmlFor='password'>Password</label>
              <input
                id='password'
                type="password"
                placeholder='Password'
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button className="login-button" title="login">Log In</button>
          </form>
        </div>
        <div className="box2">
          <p>Don't have an account? <Link to={"/signup"} className="signup1">Sign Up</Link></p>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default Login;
