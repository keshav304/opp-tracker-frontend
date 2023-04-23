import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import { isAuth } from "../../../auth/Helpers";

function Sidebar(props) {
  const user = isAuth()
  const isAdminOrStaff = user ? user.email.indexof("sathyabama") > -1 || user.email === "keshavjhaa2678@gmail.com" : true

  const handeClick = (e)=> {
    console.log(props,e)
    props.setType(e)
  }
  return (
    <div className="side-bar">
      { isAdminOrStaff ? <div className="d-flex justify-content-center">
        {/* <button type="button" class="btn btn-primary mt-3 new-post">
          
        </button> */}
        <Link to="/newpost" className="btn btn-primary mt-3 new-post">
          Create New Post
        </Link>
        </div> :null
       }
      <div className="p-3">
        <div>
          <h5 className="ps-1 text-center text-decoration-underline"> Posts</h5>
          <ul>
            <li>
              <Link
                to="/"
                style={{ color: "#333333", textDecoration: "none" }}
                onClick={()=>handeClick("all")}
              >
                All posts
              </Link>
            </li>
            <Link
                to="/myposts"
                style={{ color: "#333333", textDecoration: "none" }}
              >
                My Posts
              </Link>
            <li>
              <Link
                to="/bookmarks"
                style={{ color: "#333333", textDecoration: "none" }}
              >
                Saved Posts
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h5 className="ps-1 text-center text-decoration-underline">Category</h5>
          <ul className="text-center">
            <li onClick={()=>handeClick("openSource")}>Open-Source</li>
            <li onClick={()=>handeClick("interships")}>Interships</li>
            <li onClick={()=>handeClick("Scholarships")}>Scholarships</li>
            <li onClick={()=>handeClick("studentPrograms")}>Student Programs</li>

            <li onClick={()=>handeClick("coding")}>Coding Contest</li>
            <li onClick={()=>handeClick("OtherCategories")}>Others categories</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
