import '../css/Signup.css';
import { useState } from 'react';

function Signup() {
  // Managing form data state
  const [formData, setFormData] = useState({
    mobileOrEmail: '',
    fullName: '',
    username: '',
    password: ''
  });

  // Handling form changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handling form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
    // Submit form data to your API or process it here
  };

  return (
    <div className="app">
      <div className="signup-box">
        <h1 className="instagram-logo">Instagram</h1>
        <button className="facebook-login">Log in with Facebook</button>
        <div className="divider">OR</div>
        
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="mobileOrEmail"
            placeholder="Mobile Number or Email"
            value={formData.mobileOrEmail}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          
          <p className="info-text">
            People who use our service may have uploaded your contact information to Instagram.
            <a href="#learn-more"> Learn More</a>
          </p>
          
          <p className="policy-text">
            By signing up, you agree to our <a href="#terms">Terms</a>, <a href="#privacy">Privacy Policy</a>, and <a href="#cookies">Cookies Policy</a>.
          </p>
          
          <button type="submit" className="signup-btn">Sign Up</button>
        </form>
        
        <p className="login-link">
          Have an account? <a href="#login">Log in</a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
