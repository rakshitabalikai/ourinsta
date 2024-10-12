import '../css/Signup.css';
import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import logo from "../assets/logo/logo.png"
function Signup() {
  const [formData, setFormData] = useState({
    mobile: '',
    email: '',
    fullName: '',
    username: '',
    password: '',
    gender: '',
    dateOfBirth: ''
  });

  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Function for basic validation
  const validateForm = () => {
    const { mobile, email, password, fullName, username, gender, dateOfBirth } = formData;

    if (!mobile.match(/^\d{10}$/)) {
        setErrorMessage("Please enter a valid 10-digit mobile number.");
        return false;
    }

    if (!email.includes('@')) {
        setErrorMessage("Please enter a valid email address.");
        return false;
    }

    if (password.length < 6) {
        setErrorMessage("Password must be at least 6 characters long.");
        return false;
    }

    if (!fullName || !username || !gender || !dateOfBirth) {
        setErrorMessage("All fields are required.");
        return false;
    }

    return true;
};


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch('http://localhost:5038/api/social_media/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData) // Ensure the form data is sent as JSON
      });

      const result = await response.json();

      if (response.ok) {
        setSuccessMessage('User added successfully!');
        setErrorMessage(null);
      } else {
        setErrorMessage(result.message || 'An error occurred.');
        setSuccessMessage(null);
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An error occurred while connecting to the server.');
      setSuccessMessage(null);
    }
};

  return (
    <div className='container_login'>
      <div  className="main-container-login">
      <div className="box1">
        <div className="heading">
          <img src={logo}  className="logo" alt="logo" />
        </div>

        <div>
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input id="email" type="text" placeholder='Email' name="email" value={formData.email} onChange={handleChange} required />
            </div>

            <div className="field">
              <label htmlFor="mobile">Mobile Number</label>
              <input id="mobile" type="text" placeholder='Mobile Number' name="mobile" value={formData.mobile} onChange={handleChange} required />
            </div>

            <div className="field">
              <label htmlFor="fullName">Full Name</label>
              <input id="fullName" type="text" placeholder='Full Name' name="fullName" value={formData.fullName} onChange={handleChange} required />
            </div>

            <div className="field">
              <label htmlFor="username">Username</label>
              <input id="username" type="text" placeholder='username'  name="username" value={formData.username} onChange={handleChange} required />
            </div>

            <div className="field">
              <label htmlFor="password">Password</label>
              <input id="password" type="password" placeholder='Password' name="password" value={formData.password} onChange={handleChange} required />
            </div>

            <div className="field">
              <label htmlFor="gender">Gender</label>
              <select id="gender" name="gender" value={formData.gender} onChange={handleChange} required>
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="field">
              <label htmlFor="dateOfBirth">Date of Birth</label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="login-button">Sign Up</button>
          </form>

          {/* Display success or error messages */}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {successMessage && <p className="success-message">{successMessage}</p>}
        </div>

        <p className="login-link">
          Have an account? <Link to="/" className="signup1">Log in</Link>
        </p>
      </div>
      <Outlet></Outlet>
    </div>
    </div>
  );
}

export default Signup;
