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
    <div className="app">
      <div className="signup-box">
        <div className="heading">
          <img src={logo}  className="logo" alt="logo" />
        </div>

        <div>
          <form onSubmit={handleSubmit}>
            <div className="field">
              <input id="email" type="text" name="email" value={formData.email} onChange={handleChange} required />
              <label htmlFor="email">Email</label>
            </div>

            <div className="field">
              <input id="mobile" type="text" name="mobile" value={formData.mobile} onChange={handleChange} required />
              <label htmlFor="mobile">Mobile Number</label>
            </div>

            <div className="field">
              <input id="fullName" type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
              <label htmlFor="fullName">Full Name</label>
            </div>

            <div className="field">
              <input id="username" type="text" name="username" value={formData.username} onChange={handleChange} required />
              <label htmlFor="username">Username</label>
            </div>

            <div className="field">
              <input id="password" type="password" name="password" value={formData.password} onChange={handleChange} required />
              <label htmlFor="password">Password</label>
            </div>

            <div className="field">
              <select id="gender" name="gender" value={formData.gender} onChange={handleChange} required>
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <label htmlFor="gender">Gender</label>
            </div>

            <div className="field">
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
              />
              <label htmlFor="dateOfBirth">Date of Birth</label>
            </div>

            <button type="submit" className="signup-btn">Sign Up</button>
          </form>

          {/* Display success or error messages */}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {successMessage && <p className="success-message">{successMessage}</p>}
        </div>

        <p className="login-link">
          Have an account? <Link to="/" className="login">Log in</Link>
        </p>
      </div>
      <Outlet></Outlet>
    </div>
  );
}

export default Signup;
