import React, { useState,useEffect } from 'react';
import Navbar from './Navbar';
import '../CSS/Notice.css';
import '../CSS/Award.css';
import { toast,ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import AllAwards from './screens/AllAwards';

export default function Notice() {
  const [category, setcategory] = useState('');
  const [imageSrc, setImageSrc] = useState('');
  const storedDataString = localStorage.getItem('jwt');
  const storedData = storedDataString;
  const [body, setBody] = useState("");
  const [image, setImage] = useState("")
  const [url, setUrl] = useState("")
  const navigate = useNavigate()

  // Toast functions
  const notifyA = (msg) => toast.error(msg)
  const notifyB = (msg) => toast.success(msg)
  const postNotice=()=>{
    document.getElementById('notice-form-container').style.display='block';
  }
  const close=()=>{
    document.getElementById('notice-form-container').style.display='none';
  }

 

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
    // console.log(localStorage.getItem(storedData.token))

  }


  const loadfile = (event) => {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    setImageSrc(url);

    // Optionally, if you want to free memory when the component unmounts
    return () => URL.revokeObjectURL(url);
  };


  
  useEffect(() => {

    // saving post to mongodb
    if (url) {
    
      if (url) {
    
        // console.log(storedData.token);
        fetch("/award", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            "authorization": "Bearer " + storedData
          },
          body: JSON.stringify({
            body,
            pic: url,
            category,
          })
        }).then(res => res.json())
          .then(data => {
            if (data.error) {
              notifyA(data.error)
            } else {
              notifyB("Successfully Posted")
              window.location.reload();
              // navigate("/Award")
            }
          })
          .catch(err => console.log(err))
      }
  
    } 
  },[url])

  return (
    <>
      <Navbar />
      <div id='notices-container' className="notices-container">
        <h2>College Events Awards</h2>
        <button id='post_notice' onClick={()=>{postNotice()}} >POST AWARD</button>
        <div id="noticeList"></div>
      </div>
      <hr />
      <div id="notice-form-container">
        {/* <form id="addNoticeForm" > */}
       <i class='bx bx-window-close' onClick={()=>{close()}}>Close</i>
          <div className="form-group">
            <label htmlFor="noticeText">Add Event Awards:</label>
            <textarea value={body} onChange={(e) => {
          setBody(e.target.value) }}className="form-control" id="noticeText" rows="3" required></textarea>
          </div>
          <div className="form-group">
          <label for="dropdownInput">Select an option:</label>
                <select id="dropdownInput" value={category}  onChange={(e) => {
          setcategory(e.target.value) }} name="dropdownInput">
                    <option value="common">General</option>
                    <option value="Academic" >Academic</option>
                    <option value="Association">Association</option>
                    <option value="PerformingArts">Performing Arts</option>
                    <option value="Sports">Sports</option>
                    
                    {/* <!-- Add more options as needed --> */}
                </select>
          </div>
          <div className="form-group">
            <label htmlFor="uploadImage">Upload Image (Optional):</label>
            <img src={imageSrc || 'https://static.thenounproject.com/png/777906-200.png'} id="output" alt="Uploaded" />
            <input
              type="file"
              onChange={(event) => {
                loadfile(event);
                setImage(event.target.files[0])
              }}
              name="uploadImage"
              id="uploadImage"
              accept="image/*"
            />
          </div>
          <button type="submit" onClick={() => { postDetails() }} className="btn btn-primary">
            Post Notice
          </button>
        {/* </form> */}
      </div>
      <ToastContainer/>
              <AllAwards/>
             
    </>
  );
}
