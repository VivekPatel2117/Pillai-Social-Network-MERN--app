import React,{useEffect,useState} from 'react'
import Logo from '../img/logo.jpeg';
import '../CSS/Student.css';
import { useNavigate } from "react-router-dom";
import {toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Student() {
  const [UserName, setUserName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const notifyA = (msg) => toast.error(msg)
  const notifyB = (msg) => toast.success(msg)
  const notifyC = (msg) => toast.error(msg)
  const notifyD = (msg) => toast.error(msg)
  
  const navigate = useNavigate()
  const emailRegex =/^[a-zA-Z]{1,20}[0-9]{2}[a-zA-Z]{2,5}@student\.mes\.ac\.in$/;
  const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
  
  const postData = () => {


    // console.log(
    //   {
    //     UserName,
    //     Email,
    //   Password})
    // //checking email
    if (!emailRegex.test(Email)) {
      notifyD("Only Student email")
      return
    } else if (!passRegex.test(Password)) {
      notifyA("Password must contain at least 8 characters, including at least 1 number and 1 includes both lower and uppercase letters and special characters for example #,?,!")
      return
    }

    // Sending data to server
    fetch(`http://localhost:5000/Student`, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        UserName: UserName,
        Email: Email,
        Password: Password

      })
    }).then(res => res.json())
      .then(data => {
        if (data.error) {
          notifyA(data.error)
        } else {
          notifyB(data.message)

          navigate("/OtpVerify")
        }
        console.log(data)
      })
  }


  useEffect(() => {
  document.getElementById('registrationForm').addEventListener('submit',
  function (event) {
      event.preventDefault(); // Prevent the default form submission
      const password = document.getElementById('password').value;
      const confirmPassword =
          document.getElementById('confirmPassword').value;
      
      if (password !== confirmPassword) {
          notifyC("Password Does Not Match");
          return;
      }
      
      // window.location.href = 'profile.html';
      // Here you can add code to send the form data to your server or perform other actions
  });

}, []);
  return (

   <>
   <body>
<div className="form-container">
<div className="user-icon">
{/* <!-- Update the image source with a valid URL or a relative path --> */}
<img className='logo' src={Logo} alt="Pillai College Logo"/>
</div>
<form id="registrationForm">
<div className="Student-form-group">
<label htmlFor="username"><i className="fas fa-user"></i> Username:</label>
<input className='Student-input' type="text" id="username" name="username" value={UserName}  onChange={(e) => { setUserName(e.target.value) }} required/>
</div>
<div className="Student-form-group">
<label htmlFor="email"><i className="fas fa-envelope"></i> Email:</label>
<input type="email" id="email" className='Student-input' name="email" value={Email}  onChange={(e) => { setEmail(e.target.value) }} required/>
</div>
<div className="Student-form-group">
<label htmlFor="password"><i className="fas fa-lock"></i> Password:</label>
<input type="password" id="password" name="password" className='Student-input' value={Password}  onChange={(e) => { setPassword(e.target.value) }} required/>
</div>
<div className="Student-form-group">
<label htmlFor="confirmPassword"><i className="fas fa-lock"></i> Confirm
Password:</label>
<input className='Student-input' type="password" id="confirmPassword"
name="confirmPassword" required/>
</div>
<div className="Student-form-group">
<input className='Student-input submit' type="submit" onClick={() => { postData() }} value="Register"/>
<ToastContainer/>
</div>
</form>
</div>
</body>
   </>
  )
}
