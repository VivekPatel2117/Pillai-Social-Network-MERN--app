import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
} from "react-router-dom";
import React,{createContext,useState} from 'react';
import { LoginContext } from './context/LoginContext';
import ResetPass from './pages/ResetPass';
import Forgot from './pages/Forgot';
import OtpVerify from './pages/OtpVerify';
import Admin from './pages/Admin';
import Award from './pages/Award';
import Features from './pages/Features';
import Home from './pages/Home';
import Navbar from './pages/Navbar';
import Profile from './pages/Profile';
import Setting from './pages/Setting';
import SignIn from './pages/SignIn';
import Signup from './pages/Signup';
import Student from './pages/Student';
import Notice from './pages/Notice';
import Main from './pages/Events/Main';
import Sports from './pages/Events/Sports';
import Association from './pages/Events/Association';
import Academic from './pages/Events/Academic';
import PerforminArts from './pages/Events/PerforminArts';
import CreatePost from './pages/CreatePost';
import Logout from './pages/Logout';
import UserProfie from './pages/UserProfile'
import MyFolliwngPost from './pages/MyFollowingPost';
import { GoogleOAuthProvider } from '@react-oauth/google';
function App() {
     const [UserLogin, setUserLogin] = useState(false)

  return (
<>
<h1>Hello World!</h1>
<GoogleOAuthProvider clientId="424576781280-qu7p1u14597nb8d3uo421bab74bjmn0r.apps.googleusercontent.com">
<LoginContext.Provider value={{setUserLogin}}>
<Router>
 <Routes>
      <Route path="/Admin" element={<Admin/>} />
      <Route path="/Award" element={<Award/>} />
      <Route path="/Features" element={<Features/>} />
      <Route path='/Home' element={<Home/>} />
      <Route path="/CreatePost" element={<CreatePost/>} />
      <Route path="/Navbar" element={<Navbar/>} />
      <Route path="/Setting" element={<Setting/>} />
      <Route index="/SignIn" element={<SignIn/>} />
      <Route path="/Signup" element={<Signup/>} />
      <Route path="/Logout" element={<Logout/>} />
      <Route path="/Student" element={<Student/>} />
      <Route exact path="/Profile" element={<Profile/>} />
      <Route path='/Notice' element={<Notice/>} />
      <Route path='/Events/Main' element={<Main/>} />
      <Route path='/Events/Main' element={<Main/>} />
      <Route path='/Events/Sports' element={<Sports/>} />
      <Route path='/Events/Academic' element={<Academic/>} />
      <Route path='/Events/Association' element={<Association/>} />
      <Route path='/Events/PerfominArts' element={<PerforminArts/>} />
      <Route path='/Forgot' element={<Forgot/>}/>
      <Route path='/ResetPass' element={<ResetPass/>} />
      <Route path="/profile/:userid" element={<UserProfie />}></Route>
      <Route path="/MyFollowingPost" element={<MyFolliwngPost />}></Route>
      
      
    </Routes>
   </Router>
   </LoginContext.Provider>
   </GoogleOAuthProvider>
</>
  );
}

export default App;
