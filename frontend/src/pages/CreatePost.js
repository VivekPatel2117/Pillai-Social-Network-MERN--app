import React, { useState, useEffect } from "react";
import "../CSS/createPost.css";
import { toast,ToastContainer } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import Profile from '../img/profile.webp';

export default function Createpost() {
  const token = localStorage.getItem('jwt');
  // const storedDataString = localStorage.getItem('token');
  // const storedData = JSON.parse(storedDataString);
  const [body, setBody] = useState("");
  const [image, setImage] = useState("")
  const [url, setUrl] = useState("")
  const navigate = useNavigate()

  // Toast functions
  const notifyA = (msg) => toast.error(msg)
  const notifyB = (msg) => toast.success(msg)


 

  // posting image to cloudinary
  const postDetails = () => {

    console.log(body, image)
    const data = new FormData()
    data.append("file", image)
    data.append("upload_preset", "Social")
    data.append("cloud_name", "Pillai-ig")
    fetch("https://api.cloudinary.com/v1_1/Pillai-ig/image/upload", {
      method: "post",
      body: data
    }).then(res => res.json())
      .then(data => setUrl(data.url))
      .catch(err => console.log(err))
      console.log(data)
    console.log(url)
    // console.log(localStorage.getItem(token))

  }


  const loadfile = (event) => {
    var output = document.getElementById("output");
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function () {
      URL.revokeObjectURL(output.src); // free memory
    };
  };



  useEffect(() => {

    // saving post to mongodb
    if (url) {
    
      // console.log(storedData.token);
      fetch(`http://localhost:5000/CreatePost`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "authorization": "Bearer " + token
        },
        body: JSON.stringify({
          body,
          pic: url
        })
      }).then(res => res.json())
        .then(data => {
          if (data.error) {
            notifyA(data.error)
          } else {
            notifyB("Successfully Posted")
            navigate("/Home")
          }
        })
        .catch(err => console.log(err))
    }

  }, [url])
const UserName=JSON.parse(localStorage.getItem('user'))
// console.log(UserName.UserName);


  return (
    <div className="createPost">
      {/* //header */}
      <div className="post-header">
        <h4 style={{ margin: "3px auto" }}>Create New Post</h4>
        <button id="post-btn" onClick={() => { postDetails() }}>Share</button>
      </div>
      {/* image preview */}
      <div className="main-div">
        <img
          id="output"
          src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-image-512.png"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(event) => {
            loadfile(event);
            setImage(event.target.files[0])
          }}
        />
      </div>
      {/* details */}
      <div className="details">
        <div className="card-header">
          <div className="card-pic">
            <img id="user-img"
              src={Profile}
              alt="user"
            />
          </div>
          <h5 className="user_name">{UserName.UserName}</h5>
        </div>
        <textarea value={body} onChange={(e) => {
          setBody(e.target.value)
        }} type="text" placeholder="Write a caption...."></textarea>
      </div>
      <ToastContainer/>
    </div>
   
  );
}
