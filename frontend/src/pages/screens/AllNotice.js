import React, { useEffect,useState} from 'react'
import { Link } from 'react-router-dom';
import '../screens/AllNotice.css';

export default function AllNotice() {
  const storedDataString = localStorage.getItem('token');
    const storedData = JSON.parse(storedDataString);
    const token = storedData.token;
    const [data, setdata] = useState([])
  const loginStatus = () => {
    
    // console.log(storedDataString)
    // console.log(storedData)
    // console.log(token)
    if (token) {
      return [
        <>
          {/* <Navbar /> */}

        </>
      ]
    } else {
      return [
        <div className='login_dailog'>
          <h2 id='head'>Login to Continue</h2>
          <Link to='/SignIn' className='continue'>Click here to continue</Link>
        </div>
      ]
    }
  }
useEffect(() => {
  // Fetching post
  fetch('/NoticeAllPosts',{
    headers: {
      "authorization": "Bearer " + token
    },
  }).then(res=>res.json())
  .then(result=> setdata(result))
  .catch(err=>console.log(err))
}, [])

  return (
    <>
      {loginStatus()}
     
    <div className="Home">
    {data.map((posts)=>{
      console.log(posts)
      return(
        <div className='home-card'>
        <div className="home-card-header">
          <div className='home-card-pic'>
            <img src={posts.postedBy.Photo}
              alt=""/>
            <h5 className='userName'>{posts.postedBy.UserName}</h5>
          
          </div>
        </div>
        <div className="home-card-img">
          <img src={posts.photo}
            alt="" />
        </div>
        <div className="home-card-content">
        <br/>
  
        <p id='caption'>{posts.body}</p>
        </div>
       


      </div>
      )
    })}
      
      </div>

    </>

  )
}
