import React, { useEffect,useState} from 'react'
import { Link } from 'react-router-dom';
import '../screens/AllNotice.css';
import {toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
export default function Sports() {
  const storedDataString = localStorage.getItem('jwt');
    // const storedData = JSON.parse(storedDataString);
    const token = storedDataString;
    // const [data, setdata] = useState([])
    var picLink = "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"
    const notifyA = (msg) => toast.error(msg);
    
    const notifyB = (msg) => toast.success(msg)
    // console.log(localStorage.getItem("user"));
    const navigate=useNavigate();
    const [data, setdata] = useState([])
    const [comment, setComment] = useState("");
    const [show, setShow] = useState(false);
    const [item, setItem] = useState([]);
    let limit = 10
    let skip = 0
  useEffect(() => {
    const token=localStorage.getItem('jwt');
    if (!token) {
      navigate('./SignIn')
    }
    fetchPosts()
  
  // window.addEventListener("scroll",handleScroll)
  // return ()=>{
  //   window.removeEventListener("scroll",handleScroll)
  // }
      
    }, []);
    const fetchPosts = ()=>{
      // Fetching all posts
      fetch(`${process.env.REACT_APP_BACKEND_URL}categorysports`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          setdata((data)=>[...data, ...result]);
        })
        .catch((err) => console.log(err));
    }
  
    // const handleScroll = ()=>{
    //   if(document.documentElement.clientHeight + window.pageYOffset >= document.documentElement.scrollHeight){
    //     skip = skip + 10
    //     fetchPosts()
    //   }
    // }
  
  const likePost=(id)=>{
    fetch(`${process.env.REACT_APP_BACKEND_URL}likeAward`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((posts) => {
          if (posts._id == result._id) {
            return result;
          } else {
            return posts;
          }
        });
        setdata(newData);
        console.log(result);
      });
  };
  const unlikePost = (id) => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}unlikeAward`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((posts) => {
          if (posts._id == result._id) {
            return result;
          } else {
            return posts;
          }
        });
        setdata(newData);
        console.log(result);
      });
  };
   // to show and hide comments
   const toggleComment = (posts) => {
    if (show) {
      setShow(false);
    } else {
      console.log(posts);
      setShow(true);
      setItem(posts);
    }
  };
  const makeComment = (text, id) => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}commentAward`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        text: text,
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((posts) => {
          if (posts._id == result._id) {
            return result;
          } else {
            return posts;
          }
        });
        setdata(newData);
        setComment("");
        notifyB("Comment posted");
        console.log(result);
      });
  };
  return (
    <>
    <Navbar/>
    <div className="Home">
    {data.map((posts)=>{
     
      return(
        <div className='home-card'>
        <div className="home-card-header">
          <div className='home-card-pic'>
            <img src={posts.postedBy.Photo ? posts.postedBy.Photo : picLink}
              alt=""/>
            <h5 className='userName'>
            <Link to={`/profile/${posts.postedBy._id}`}>
                  {posts.postedBy.UserName}
                </Link></h5>
          
          </div>
        </div>
        <div className="home-card-img">
          <img src={posts.photo}
            alt="" />
        </div>
        <div className="home-card-content">
          {       
           posts.likes.includes(
          JSON.parse(localStorage.getItem("user"))._id
          )
            ?
            (<span
              className="material-symbols-outlined material-symbols-outlined-red"
              onClick={() => {
                unlikePost(posts._id);
              }}
            >
              favorite
            </span>
          ) : (
            <span
              className="material-symbols-outlined"
              onClick={() => {
                likePost(posts._id);
              }}
            >
              favorite
            </span>
          )
          }
        
       
        <p>{posts.likes.length} like</p>
        {/* <br/> */}
        <p>{posts.body}</p>
        <p
                style={{ fontWeight: "bold", cursor: "pointer" }}
                onClick={() => {
                 
                  toggleComment(posts);
                }}
              >
               
                View all comments
              </p>
        </div>
        <div className="add-comment">
        <i class='bx bx-smile'></i>
        <input
                type="text"
                placeholder="Add a comment"
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value);
                }}
              />
        <button
                className="comment"
                onClick={() => {
                  makeComment(comment, posts._id);
                }}
              >
                Post
              </button>
        </div>
      </div>
      );
    })}
      
      {/* show Comment */}
      {show && (
        <div className="showComment">
          
          <div className="container">
            <div className="postPic">
              <img src={item.photo} alt="" />
            </div>
            <div className="caption-all">
            <p>{item.body}</p>
            </div>
            <div className="details">
              {/* card header */}
              <div
                className="home-card-header"
                style={{ borderBottom: "1px solid #00000029" }}
              >
                <div className="home-card-pic">
                  <img
                  id='user-img-home'
                    src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                    alt=""
                  />
                </div>
                <h5 id='comment-username'>{item.postedBy.UserName}</h5>
              </div>

              {/* commentSection */}
              <div
                className="comment-section"
                style={{ borderBottom: "1px solid #00000029" }}
              >
                {item.comments.map((comment) => {
                  return (
                    <p className="comm">
                      <span
                        className="commenter"
                        style={{ fontWeight: "bolder" }}
                      >
                        {comment.postedBy.UserName}{" "}
                      </span>
                      <span className="commentText">{comment.comment}</span>
                    </p>
                  );
                })}
              </div>

              {/* card content */}
              <div className="home-card-content">
                <p>{item.likes.length} Likes</p>
              </div>

              {/* add Comment */}
              <div className="add-comment">
                <span className="material-symbols-outlined">mood</span>
                <input
                  type="text"
                  placeholder="Add a comment"
                  value={comment}
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                />
                <button
                  className="comment"
                  onClick={() => {
                    makeComment(comment, item._id);
                    toggleComment();
                  }}
                >
                  Post
                </button>
              </div>
            </div>
          </div>
          <div
            className="close-comment"
            onClick={() => {
              toggleComment();
            }}
          >
            <span className="material-symbols-outlined material-symbols-outlined-comment">
              close
            </span>
          </div>
        </div>
      )}
      </div>
    </>
   
  )
}
