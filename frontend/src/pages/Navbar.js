import React,{useEffect} from 'react'
import '../CSS/Navbar.css';
import Profile from '../img/profile.webp';
import Logo from '../img/logo.jpeg';
import { Link } from 'react-router-dom';
function Navbar() {
 

  const loadFile=(event)=>{
    var output = document.getElementById("output");
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function () {
      URL.revokeObjectURL(output.src); // free memory
    };
  };
  // navbar Sidebar 
                    //Start.
                    useEffect(() => {
                      const body = document.querySelector("body");
                      const darkLight = document.querySelector("#darkLight");
                      const sidebar = document.querySelector(".sidebar");
                      const submenuItems = document.querySelectorAll(".submenu_item");
                      const sidebarOpen = document.querySelector("#sidebarOpen");
                      const sidebarClose = document.querySelector(".collapse_sidebar");
                      const sidebarExpand = document.querySelector(".expand_sidebar");
                      const uploadBtn = document.getElementById('uploadBtn');
                      const closeBtn = document.getElementById('closeBtn');
                      const form = document.querySelector('form');
                  
                      const handleSidebarClose = () => {
                        sidebar.classList.add("close");
                        sidebar.classList.add("hoverable");
                      };
                  
                      const handleSidebarExpand = () => {
                        sidebar.classList.remove("close", "hoverable");
                      };
                  
                      const handleSidebarMouseEnter = () => {
                        sidebar.classList.remove("close");
                      };
                  
                      const handleSidebarMouseLeave = () => {
                        sidebar.classList.add("close");
                      };
                  
                      const handleDarkLightToggle = () => {
                        body.classList.toggle("dark");
                        darkLight.classList.toggle("bx-sun");
                        darkLight.classList.toggle("bx-moon");
                      };
                  
                      const handleSubmenuToggle = (index) => {
                        submenuItems.forEach((item, index2) => {
                          item.classList.toggle("show_submenu", index === index2);
                        });
                      };
                  
                      // const handleSidebarToggle = () => {
                      //  if (window.innerWidth < 768) {
                      //     sidebar.classList.add("close");
                      //   } else {
                      //     sidebar.classList.remove("close");
                      //   }
                      // };
                  
                      const handlePopupOpen = () => {
                        document.getElementById('overlay').style.display = 'block';
                        document.getElementById('popup').style.display = 'block';
                      };
                  
                      const handlePopupClose = () => {
                        document.getElementById('overlay').style.display = 'none';
                        document.getElementById('popup').style.display = 'none';
                      };
                  
                      const handleFormSubmit = (e) => {
                        e.preventDefault();
                        
                      };
                  
                      // Add event listeners using the functions defined above
                      sidebarClose.addEventListener("click", handleSidebarClose);
                      sidebarExpand.addEventListener("click", handleSidebarExpand);
                      sidebar.addEventListener("mouseenter", handleSidebarMouseEnter);
                      sidebar.addEventListener("mouseleave", handleSidebarMouseLeave);
                      darkLight.addEventListener("click", handleDarkLightToggle);
                      submenuItems.forEach((item, index) => {
                        item.addEventListener("click", () => handleSubmenuToggle(index));
                      });
                      // sidebarOpen.addEventListener("click",handleSidebarToggle);
                      sidebarOpen.addEventListener("click", () => {
                        sidebar.classList.toggle("close");
                    });
                      uploadBtn.addEventListener('click', handlePopupOpen);
                      closeBtn.addEventListener('click', handlePopupClose);
                      form.addEventListener('submit', handleFormSubmit);
                  
                      // Use classList.toggle for submenu items
submenuItems.forEach((item, index) => {
  item.addEventListener("click", () => {
      item.classList.toggle("show_submenu");
      submenuItems.forEach((item2, index2) => {
          if (index !== index2) {
              item2.classList.remove("show_submenu");
          }
      });
  });
  });
                      // Clean up event listeners on component unmount
                      return () => {
                        sidebarClose.removeEventListener("click", handleSidebarClose);
                        sidebarExpand.removeEventListener("click", handleSidebarExpand);
                        sidebar.removeEventListener("mouseenter", handleSidebarMouseEnter);
                        sidebar.removeEventListener("mouseleave", handleSidebarMouseLeave);
                        darkLight.removeEventListener("click", handleDarkLightToggle);
                        // sidebarOpen.removeEventListener("click", handleSidebarToggle);
                        uploadBtn.removeEventListener('click', handlePopupOpen);
                        closeBtn.removeEventListener('click', handlePopupClose);
                        form.removeEventListener('submit', handleFormSubmit);
                      };
                    }, []); // Empty dependency array ensures it runs only once after the initial render
                  
                  
return (
<>
     {/* <div className="main-container">       */}
     {/* <!-- navbar --> */}
  <nav className='navbar'>
      <div className="logo_item">
           
             <div>
          <i className="bx bx-menu" id="sidebarOpen"></i>
          <Link to='/Home'> <img src={Logo} className='logo' alt="Pillai College"/>Pillai </Link>
          </div>
      </div>
          

          <div className="search_bar">
            <input type="text" placeholder="Search" />
          </div>

            {/* <!-- Upload Button--> */}
            {/* <!-- Start --> */}
       <Link to='/CreatePost'><button id="uploadBtn">Upload</button></Link>

    <div id="overlay"></div>
        <div id="popup">
              <span id="closeBtn">&times;</span>
            <form>
                <input className='input' type="hidden" id="userIdInput" name="userIdInput" value="none"/>
                  <label htmlFor="file">Select a file:</label>
                  <img src='https://static.thenounproject.com/png/777906-200.png' id='output'/>
                        <input type="file" onChange={(event)=>{loadFile(event)}} name="uploadImage" id="uploadImage" accept="image/*" />
                      <br/><br/>
                  <label htmlFor="captionInput">Caption:</label>
                <input className='input' type="text" id="captionInput" name="captionInput"/>
                      <br/><br/>
                <input className='input' type="submit" value="Share "/>

            </form>
          </div>
            {/* <!-- End --> */}

          <div className="navbar_content">
              <i className="bi bi-grid"></i>
              <i className='bx bx-sun' id="darkLight"></i>
              <i className='bx bx-bell'></i>
             <Link to='/Profile'><img src={localStorage.getItem('profile-pic')} alt="" className="profile logo" /></Link> 
          </div>
</nav>

        {/* <!-- sidebar --> */}
        <div className="main-content">
            <nav className="sidebar">
                <div className="menu_content">
                    <ul className="menu_items">
                        <div className="menu_title menu_dahsboard"></div>
                        {/* <!-- duplicate or remove this li tag if you want to add or remove navlink with submenu -->
                        <!-- start --> */}
                        <Link to="/Events/Main">

                            <li className="item">
                                <div className="nav_link submenu_item">
                                    <span className="navlink_icon">
                                    <i className='bx bxs-party'></i>
                                    </span>
                                    <span className="navlink">Events</span>
                                    <i className="bx bx-chevron-right arrow-left"></i>
                                   
                                </div>
              <div className='nav_link submenu_item'>
                                <ul className="menu_items submenu">
                <Link to="/Events/Sports" className="nav_link sublink">Sports</Link>
                <Link to="/Events/Academic" className="nav_link sublink">Academic</Link>
                <Link to="/Events/Association" className="nav_link sublink">Association</Link>
                <Link to="/Events/PerformingArts" className="nav_link sublink">Performing Arts</Link>
              </ul>
              </div>
                            </li>
                           
                        </Link>

                        {/* <!-- end --> */}
                    </ul>


                    <ul className="menu_items">
                        <div className="menu_title menu_setting"></div>
                        <li className="item">
                            <Link to='/Notice' className="nav_link">
                                <span className="navlink_icon">
                                    <i className="bx bx-flag"></i>
                                </span>
                                <span className="navlink">Notice board</span>
                            </Link>
                        </li>
                        
                        <li className="item">
                            <Link to='/Award' className="nav_link">
                                <span className="navlink_icon">
                                    <i className="bx bx-medal"></i>
                                </span>
                                <span className="navlink">Award</span>
                            </Link>
                        </li>
                        <li className="item">
                            <Link to="/Setting" className="nav_link">
                                <span className="navlink_icon">
                                    <i className="bx bx-cog"></i>
                                </span>
                                <span className="navlink">Setting</span>
                            </Link>
                        </li>
                        <li className="item">
                            <Link to='/MyFollowingPost' className="nav_link">
                                <span className="navlink_icon">
                                    <i className="bx bx-layer"></i>
                                </span>
                                <span className="navlink">My Folliwng</span>
                            </Link>
                        </li>
                        <li className="item">
                            <Link to='/Profile' className="nav_link">
                                <span className="navlink_icon">
                                <i className="bx bx-user"></i>
                                </span>
                                <span className="navlink">Profile</span>
                            </Link>
                        </li>
                        <li className="item">
                            <Link to='/Logout' className="nav_link">
                                <span className="navlink_icon">
                                {/* <i className="bx bx-user"></i> */}
                                <i className='bx bx-log-out'></i>
                                 </span>
                                <span className="navlink">Logout</span>
                            </Link>
                        </li>
                    </ul>

                    {/* <!-- Sidebar Open / Close --> */}
                    <div className="bottom_content">
                        <div className="bottom expand_sidebar">
                            <span> Expand</span>
                            <i className='bx bx-log-in'></i>
                        </div>
                        <div className="bottom collapse_sidebar">
                            <span> Collapse</span>
                            <i className='bx bx-log-out'></i>
                        </div>
                    </div>
                </div>
      </nav>
    </div>
  
  </>
  )
}

export default Navbar
