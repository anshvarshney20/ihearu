import React, { useState, useContext } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useUserAuth } from '../../Components/AuthContext';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('')
  const { login,message } = useUserAuth()
  const navigate = useNavigate()
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!email || !password) {
        setError('Please provide both email and password.');
        return;
      }
      setError('');
      await login(email, password);
      
    } catch (error) {
      setError(error.message || 'An error occurred');
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
                    <h1>Login for Admin Panel</h1>
                    {error && <div className="error-message">{error}</div>}
                    {message && <div className="error-message" style={{color:"red"}}>{message}</div>}
                  </div>

                  <div className="col-12">
                    <form className="row form-design" onSubmit={handleSubmit}>
                      <div className="form-group col-12">
                        <label htmlFor="email">User Name</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="User@gmail.com"
                          name="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="form-group col-12">
                        <label htmlFor="password">Password</label>
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
                        <Link to="/forgotpassword" className="for_got">
                          Forgot Password?
                        </Link>
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

export default Login;
