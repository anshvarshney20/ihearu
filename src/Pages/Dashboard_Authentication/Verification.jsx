import React, { useState, useRef, useEffect } from 'react';
import { useUserAuth } from '../../Components/AuthContext';
import { Link } from 'react-router-dom';

const Verification = () => {
  const { verification, request_again } = useUserAuth();
  const [otp, setOtp] = useState(['', '', '', '']);
  const [countdown, setCountdown] = useState(30);

  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  useEffect(() => {

    const timer = setInterval(() => {
      if (countdown > 0) {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  const handleInputChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;

    setOtp(newOtp);


    if (value && index < 3 && inputRefs[index + 1].current) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && index > 0 && !otp[index]) {

      const newOtp = [...otp];
      newOtp[index - 1] = '';
      setOtp(newOtp);

      if (inputRefs[index - 1].current) {
        inputRefs[index - 1].current.focus();
      }
    }
  };
  const requestagain = (e) => {
    e.preventDefault()
    const email = localStorage.getItem("useremail");
    request_again(email)
    setCountdown(30);
  }
  const handleSubmit = (e) => {
    e.preventDefault();

    const email = localStorage.getItem('useremail');
    console.log(email);

    const joinedOtp = otp.join('');
    verification(email, +joinedOtp);
    console.log(joinedOtp);
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
                    <h1>Verification</h1>
                    <p>Please enter the OTP received on your Email Address </p>
                  </div>
                  <div className="col-12">
                    <form className="row form-design" onSubmit={handleSubmit}>
                      <div className="form-group col-12 otp_input d-flex">
                        {otp.map((digit, index) => (
                          <input
                            key={index}
                            type="text"
                            className="form-control me-3 px-1 text-center"
                            maxLength="1"
                            placeholder={index + 1}
                            name={`digit${index}`}
                            id={`digit${index}`}
                            value={digit}
                            onChange={(e) => handleInputChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            ref={inputRefs[index]}
                          />
                        ))}
                      </div>
                      <div className="form-group col-12 text-center">
                        <span className="count_Sec">{`00:${countdown < 10 ? `0${countdown}` : countdown}`}</span>
                      </div>
                      <div className="form-group col-12 text-center">
                        <label htmlFor="">Didn't receive the OTP? <Link onClick={requestagain}>Request again</Link></label>
                      </div>
                      <div className="form-group col-12">
                        <button type="submit" className="comman_btn">
                          <span>Confirm</span>
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

export default Verification;
