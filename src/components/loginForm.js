import React, {useState} from 'react';

import FirebaseAuthService from '../FirebaseAuthService';

const LoginForm = ({existingUser}) => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            await FirebaseAuthService.loginUser(userName, password);
            setUserName('');
            setPassword('');
        } catch (err) {
            alert(err.message);
        }
    }

    function handleLogout() {
        FirebaseAuthService.logOut();
    }

    async function handleSendResetPasswordEmail() {
        if (!userName) {
            alert('Missing username');
            return;
        }

        try {
            await FirebaseAuthService.setPasswordResetEmail(userName);
            alert('Sent the password reset email');
        } catch (e) {
            alert(e.message);
        }
    }

    return (
        <div className="login-form-container">
            {
                existingUser ?
                    <div className="row">
                        <h3>Welcome, {existingUser.email}</h3>
                        <button type="button" className="primary-button" onClick={handleLogout}>Logout</button>
                    </div>
                    :
                    <form onSubmit={handleSubmit} className="login-form">
                        <label className="input-label login-label">
                            Username (email)
                            <input
                                type="email"
                                required
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                className="input-text"
                            />
                        </label>
                        <label className="input-label login-label">
                            Password
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="input-text"
                            />
                        </label>
                        <div className="button-box">
                            <button className="primary-button">Login</button>
                            <button
                                type="button"
                                onClick={handleSendResetPasswordEmail}
                                className="primary-button">
                                Reset password
                            </button>
                        </div>
                    </form>
            }
        </div>
    );
};

export default LoginForm;