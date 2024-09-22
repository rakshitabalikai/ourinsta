import '../css/Signup.css';
import { useState } from 'react';

function Signup() {
  const [formData, setFormData] = useState({
    mobileOrEmail: '',
    fullName: '',
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
  };

  return (
    <div className="app">
      <div className="signup-box">
        <h1 className="instagram-logo">Instagram</h1>
        
    <div>
        <form onSubmit={handleSubmit}>
          <div className='field'>
            <input id='mobileOrEmail' type="text" name="mobileOrEmail" value={formData.mobileOrEmail} onChange={handleChange} required />
            <label htmlFor='mobileOrEmail'>Mobile Number or Email</label>
          </div>

          <div className='field'>
            <input id='fullName' type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
            <label htmlFor='fullName'>Full Name</label>
          </div>

          <div className='field'>
            <input id='username' type="text" name="username" value={formData.username} onChange={handleChange} required />
            <label htmlFor='username'>Username</label>
          </div>

          <div className='field'>
            <input id='password' type="password" name="password" value={formData.password} onChange={handleChange} required />
            <label htmlFor='password'>Password</label>
          </div>

          <p className="info-text">
            People who use our service may have uploaded your contact information to Instagram. <a href="#learn-more"> Learn More</a>
          </p>
          
          <p className="policy-text">
            By signing up, you agree to our <a href="#terms">Terms</a>, <a href="#privacy">Privacy Policy</a>, and <a href="#cookies">Cookies Policy</a>.
          </p>
          
          <button type="submit" className="signup-btn">Sign Up</button>
        </form>
    </div>
        
        <p className="login-link">
          Have an account? <a href="#login">Log in</a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
