import React, { useState } from 'react';
import { useUserAuth } from '../../Components/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const ResetPassword = () => {
    const { reset_password } = useUserAuth();
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const USER_EMAIL_KEY = 'useremail';
    const email = localStorage.getItem(USER_EMAIL_KEY);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate passwords
        if (password !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }

        try {
            // Assuming you have the user's email stored in localStorage
            console.log(email)
            await reset_password(email, password);
            // Optionally, you can navigate to a different page after resetting the password
        } catch (error) {
            console.error('Error during password reset:', error.message);
        }
    };

    return (
        <>
            <section className="login_page">
                <div className="container-fluid px-0">
                    <div className="row justify-content-start">
                        <div className="col-4">
                            <div className="login_page_form shadow">
                                <div className="row">
                                    <div className="col-12 formheader mb-4">
                                        <div className="text-center">
                                            <img src="assets/img/logo.png" alt="" />
                                        </div>
                                        <h1>Reset Password</h1>
                                        <p>Enter New Password</p>
                                    </div>
                                    <div className="col-12">
                                        <form className="row form-design" onSubmit={handleSubmit}>
                                            <div className="form-group col-12">
                                                <label htmlFor="password">New Password</label>
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    placeholder="**********"
                                                    name="password"
                                                    id="password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                />
                                            </div>
                                            <div className="form-group col-12">
                                                <label htmlFor="confirmPassword">Confirm New Password</label>
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    placeholder="**********"
                                                    name="confirmPassword"
                                                    id="confirmPassword"
                                                    value={confirmPassword}
                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                />
                                            </div>
                                            <div className="form-group col-12">
                                                <button type="submit" className="comman_btn">
                                                    <span>Save</span>
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ResetPassword;
