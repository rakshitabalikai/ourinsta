import React, { useState } from 'react';
import axios from 'axios';
import "../css/Restpassword.css";

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isVerified, setIsVerified] = useState(false);

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5038/api/social_media/reset-password/verify-otp', {
                email,
                otp,
            });
            setMessage(response.data.message);
            setIsVerified(true);
        } catch (error) {
            setMessage(error.response?.data?.message || 'Error verifying OTP');
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5038/api/social_media/reset-password/update', {
                email,
                newPassword,
            });
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response?.data?.message || 'Error resetting password');
        }
    };

    return (
        <div className="container">
            <h2>Reset Password</h2>
            {!isVerified ? (
                <form onSubmit={handleVerifyOtp}>
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
                    <div className="form-group">
                        <label htmlFor="otp">Enter OTP:</label>
                        <input
                            type="text"
                            id="otp"
                            className="form-control"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Verify OTP</button>
                </form>
            ) : (
                <form onSubmit={handleResetPassword}>
                    <div className="form-group">
                        <label htmlFor="password">New Password:</label>
                        <input
                            type="password"
                            id="password"
                            className="form-control"
                            placeholder="Enter your new password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Reset Password</button>
                </form>
            )}
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default ResetPassword;
