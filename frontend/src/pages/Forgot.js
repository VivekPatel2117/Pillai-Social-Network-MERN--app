import React, { useState } from 'react';
import '../CSS/forgot.css';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
export default function Forgot() {
  const [email, setEmail] = useState('');
  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);
  const navigate=useNavigate();
  const forgot = () => {
    fetch(`http://localhost:5000/forgotPass`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        // Add any other headers if required
      },
      body: JSON.stringify({
        email,
      })
    }).then(res => res.json())
      .then(data => {
        if (data.error) {
          notifyA(data.error);
        } else {
          notifyB(data.message);
          navigate('/ResetPass');
        }
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    forgot(); // Call forgot function
  };

  return (
    <>
      <body>
        <form id='form' className='login-container' onSubmit={handleSubmit}>
          <p>Forgot Password</p>
          <input
            type="email"
            name="email"
            placeholder='Enter your Email'
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className='login-btn'
            type="button"
            value="Submit"
            onClick={forgot} // Call forgot function on click
          />
        </form>
      </body>
      <ToastContainer />
    </>
  );
}
