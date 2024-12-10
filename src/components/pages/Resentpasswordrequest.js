// components/RequestReset.js
import React, { useState } from 'react';
import axios from 'axios';
import { Navigate} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const RequestReset = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/social_media/reset-password/request', { email });
            setMessage(response.data.message);
            navigate('/Resetpassword');
        } catch (error) {
            setMessage(error.response?.data?.message || 'Error requesting password reset');
        }
    };

    return (
        <div className="container">
            <h2>Forgot Password?</h2>
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
                <button type="submit" className="btn btn-primary">Send Reset Link</button>
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default RequestReset;
