import React, { useState } from 'react';
import { useUserAuth } from '../../Components/AuthContext';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const { forgotPassword,message } = useUserAuth();
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!email) {
        setError('Please provide an email address.');
        return;
      }
      const response = await forgotPassword(email);
  
      if (response) {
        if (response.error) {
          console.log(response.error); // Show specific error from the API
        } else if (response.message) {
          localStorage.setItem('useremail', email);
        } else {
          setError('An unexpected response was received from the server.');
        }
      } else {
        setError('No response received from the server.');
      }
    } catch (error) {
      console.error(error);
      setError('An error occurred. Please try again.');
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
                    <h1>Forgot Password</h1>
                    {message && <div className="success-message">{message}</div>}
                  </div>
                  <div className="col-12">
                    <form className="row form-design" onSubmit={handleSubmit}>
                      <div className="form-group col-12">
                        <label htmlFor="name">Email Address</label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="User@gmail.com"
                          name="email"
                          id="name"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          
                          required
                        />
                      </div>
                      <div className="form-group col-12">
                        <button type="submit" className="comman_btn">
                          <span>Submit</span>
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

export default ForgotPassword;