import React, { useEffect ,useState,useContext} from 'react';
import '../CSS/SignIn.css';
import { Link ,useNavigate} from 'react-router-dom';
import Logo from '../img/logo.jpeg';
import {toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoginContext } from '../context/LoginContext';
import { GoogleLogin } from '@react-oauth/google';
import {  jwtDecode} from 'jwt-decode';
export default function SignIn() {
  const notifyA = (msg) => toast.error(msg)
  const notifyB = (msg) => toast.success(msg)
  const {setUserLogin}=useContext(LoginContext);
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const navigate = useNavigate()
  // const { setUserLogin } = useContext(LoginContext)
  const showPass =()=> {
    var x = document.getElementById("password");
    console.log("Clicked");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  };

  const emailRegex =/^[a-zA-Z]{1,20}[0-9]{2}[a-zA-Z]{2,5}@student\.mes\.ac\.in$/;
  const emailAdmin =/^[a-zA-Z]{1,20}[0-9]{2}[a-zA-Z]{2,5}@mes\.ac\.in$/;
 // Define the showPopup function
  const showPopup = () => {
    document.getElementById('popup').style.display = 'flex';
  };
  const verify=()=>{

     fetch("/SignIn", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: Email,
        Password: Password

      })
    }).then(res => res.json())
      .then(data => {
        if (data.error) {
          notifyA(data.error)
        } else {
          notifyB(data.message);
          const dataString = JSON.stringify(data);
          localStorage.setItem('jwt',data.token);
          localStorage.setItem('user',JSON.stringify(data.user));
          localStorage.setItem('token', dataString);
          setUserLogin(true)
          navigate("/Home")
        }
        console.log(data)
      })
  }

  const continueWithGoogle =(credentialResponse)=>{
    console.log(credentialResponse);
    const jwtDetail = jwtDecode(credentialResponse.credential)
    console.log(jwtDetail)
    fetch("/googleLogin",{
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: jwtDetail.name,
        userName: jwtDetail,
        email:jwtDetail.email,
        email_verified:jwtDetail.email_verified,
        clientId:credentialResponse.clientId,
        Photo:jwtDetail.picture

      })
    }).then(res => res.json())
      .then(data => {
        if (data.error) {
          notifyA(data.error)
        } else {
          notifyB("Signed In Successfully")
          console.log(data)
          localStorage.setItem("jwt", data.token)
          localStorage.setItem("user", JSON.stringify(data.user))
          setUserLogin(true)
          navigate("/Home")
        }
        console.log(data)
      })
  }
   
  
  useEffect(() => {
    document.getElementById('login-SignIn-form').addEventListener('submit', function (event) {
      event.preventDefault();
      if (emailRegex) {
      console.log("Login")
      //  navigate("/Profile")
      } else {
        notifyA('Login failed. Invalid email SignIn-format.');
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
          <form className='SignIn-form' id="login-SignIn-form">
            <div className="input-group">
              <label htmlhtmlFor="email"><i className="fas fa-envelope"></i> Email:</label>
              <input type="email" id="email" name="email" value={Email} onChange={(e) => { setEmail(e.target.value) }} required />
            </div>
            <div className="input-group">
              <label htmlhtmlFor="password"><i className="fas fa-lock"></i> Password:</label>
              <input type="password" id="password"  name="password" value={Password} onChange={(e) => { setPassword(e.target.value) }} required />
            </div>
            <div className="input-group remember-me">
              <input type="checkbox" id="remeber" onClick={showPass}  name="remember" />
              <label htmlhtmlFor="remember">See Password</label>
            </div>
            <button type="submit" id="login-btn" onClick={()=>{verify()}}>Login</button>
            <p className="forgot-password"><Link to="Forgot">Forgot Password?</Link></p>
            <GoogleLogin
            onSuccess={credentialResponse => {
             continueWithGoogle(credentialResponse)
            }}
            onError={() => {
              console.log('Login Failed');
            }}
          />
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
      <ToastContainer/>
    </>
  );
}

