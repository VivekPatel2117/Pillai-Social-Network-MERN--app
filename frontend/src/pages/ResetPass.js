import React,{useState} from 'react'
import '../CSS/forgot.css';
import {toast,ToastContainer} from 'react-toastify';
import { useNavigate } from 'react-router-dom';
export default function ResetPass() {
  const navigate=useNavigate();
  const [password, setpassword] = useState('');
  const [Confirmpassword, setConfirmpassword] = useState('');
  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);
  const showPass =()=> {
    var x = document.getElementById("password");
    console.log("Clicked");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  };
    const reset=()=>{

      if (password===Confirmpassword) {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/reset`,{
            method:"POST",
            headers:{
              'Content-Type':'application/json'
            },
            body:JSON.stringify({
              password,
            })
        }).then(res=>res.json())
        .then(data=>{
          if (data.error) {
            notifyA(data.error);
          } else {
            notifyB(data.message);
            navigate('/')
          }
        });

      } else {
        notifyA("Password and Confirm Password Doest not Match")
      } 
    }       
    const handleSubmit=(e) =>{
      e.preventDefault();
      reset();
    }
  return (
    <>
    <body>
    <form id='form' className='login-container' onSubmit={handleSubmit}>
      <p>Forgot Password</p>
      <input
        type="email"
        name="email"
        placeholder='New Password'
        id="password"
        value={password}
        onChange={(e) => setpassword(e.target.value)}
      />
      <input
        type="password"
        name="email"
        placeholder='Confirm Password'
        id="password"
        value={Confirmpassword}
        onChange={(e) => setConfirmpassword(e.target.value)}
      />
      <br />
      <input type="checkbox" name="showpass" id="showpass" onClick={showPass} />
      <span style={{"padding-left":"5px"}}>See password</span>
      <p>Use Lower & Upper case also numeric and special symbols</p>
      <input
        className='login-btn'
        type="button"
        value="Reset"
        onClick={reset} // Call forgot function on click
      />
    </form>
  </body>
  <ToastContainer />
</>
  )
}
