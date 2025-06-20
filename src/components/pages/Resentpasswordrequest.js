import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RequestReset = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://socialmedia-apis-2.onrender.com/api/social_media/reset-password/request', { email });
            setMessage(response.data.message);
            setOtpSent(true);
            navigate('/Resetpassword');
        } catch (error) {
            setMessage(error.response?.data?.message || 'Error requesting OTP');
        }
    };

    return (
        <div className="container">
            <h1  style={{ color: '#8e0038',alignItems:'center' }}>Forgot Password?</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Enter your email:</label>
                    <input
                        type="email"
                        id="email"
                        className="form-control"
                        placeholder="Your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary" disabled={otpSent}>
                    {otpSent ? 'OTP Sent' : 'Send OTP'}
                </button>
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default RequestReset;
