import React, { useEffect} from 'react';
import '../CSS/Signup.css';
import { Link } from 'react-router-dom';
import Logo from '../img/logo.jpeg';

export default function Signup() {
// {const [name, setName] = useState("");


  // Define the showPopup function
  const showPopup = () => {
    document.getElementById('popup').style.display = 'flex';
  };

  useEffect(() => {
    document.getElementById('login-form').addEventListener('submit', function (event) {
      event.preventDefault(); // Prevent the default form submission
      const enteredEmail = document.getElementById('email').value;
      const emailPattern = /^([a-zA-Z]{1,20}[0-9]{2}[a-zA-Z]{2,5}@student\.mes\.ac\.in|[a-zA-Z0-9._%+-]+@gmail\.com)$/i;
      if (emailPattern.test(enteredEmail)) {
        window.location.href = 'profile.html';
      } else {
        alert('Login failed. Invalid email format.');
      }
    });
  }, []); // Empty dependency array ensures it runs only once after the initial render

  return (
    <>
      <body>
        <div className="background-image"></div>
        <div className="login-container">
          <div className="user-icon">
            {/* <!-- Update the image source with a valid URL or a relative path --> */}
            <img src={Logo} alt="Pillai College Logo" />
          </div>
          <form id="login-form">
            <div className="input-group">
              <label htmlFor="email"><i className="fas fa-envelope"></i> Email:</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="input-group">
              <label htmlFor="password"><i className="fas fa-lock"></i> Password:</label>
              <input type="password" id="password" name="password" required />
            </div>
            <div className="input-group remember-me">
              <input type="checkbox" id="remember" name="remember" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <button type="submit" id="login-btn">Login</button>
            <p className="forgot-password"><Link to="Forgot">Forgot Password?</Link></p>
          </form>
          <p className="create-account">Don't have an account?<button onClick={showPopup}>Create One</button></p>
        </div>
        {/* <!-- Popup Box --> */}
        <div className="popup-overlay" id="popup">
          <div className="popup-content">
            <p><h1>Please select your role:</h1></p>
            <div className="popup-buttons">
              <button><Link to="/Student">Student</Link></button>
              <button><Link to="/Admin">Administrator</Link></button>
            </div>
          </div>
        </div>
      </body>
    </>
  );
}
