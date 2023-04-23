import React from "react";
import moment from "moment";
import "./style.css";
import dotenv from "dotenv";
import { getCookie, isAuth } from "../../../auth/Helpers";
import { useHistory } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { useToasts } from "react-toast-notifications";
dotenv.config();

const Post = ({ post }) => {
  const { addToast } = useToasts();

  const history = useHistory();
  const handleBookmark = (event) => {
    if (isAuth() === undefined) {
      history.push("/signin");
      toast.error("please signin to save a post");
    } else {
      console.log(post);
      axios({
        method: "POST",
        url: `${process.env.REACT_APP_DEPLOYED_API}/post/bookmark`,
        data: {
          userId: isAuth()._id,
          post: {
            id: post._id,
            eventname: post.eventname,
            createdAt: post.createdAt,
            description: post.description,
            detailsLink: post.detailsLink,
            registrationLink: post.detailsLink,
            category: post.category,
            eventorganiser: post.eventorganiser,
            eventtime: post.eventtime,
            place: post.place,
          },
          headers: { Authorization: `Bearer ${getCookie("token")}` },
        },
      })
        .then((response) => {
          if (response.data.message === "post is alerady saved") {
            addToast(response.data.message, { appearance: "error" });
          } else {
            addToast(response.data.message, { appearance: "success" });
          }
        })
        .catch((error) => {
          addToast(error.response.data.message, { appearance: "error" });
        });
    }
  };

  return (
    <div className="post my-3 row" style={{ backgroundColor: "#e4e4e4" }}>
      <div className="col-4">
      <div className="event-name">
        <div className="d-flex"> 
          <i className="bi bi-calendar-check"></i>
          <p className="mb-0 fw-bold ms-2">Event name</p>
        </div>
        <p >{post.eventname}</p>
      </div>
      <div className="event-name">
        <div className="d-flex">
        <i className="bi bi-person"></i>
          <p className="mb-0 fw-bold ms-2">organiser</p>
        </div>
        <p>{post.eventorganiser}</p>
      </div>
      <div className="event-name">
        <div className="d-flex">
        <i className="bi bi-clock"></i>
          <p className="mb-0 fw-bold ms-2">timing</p>
        </div>
        <p>{post.eventtime}</p>
      </div>
      <div className="event-name">
        <div className="d-flex">
        <i className="bi bi-building"></i>
          <p className="mb-0 fw-bold ms-2">place</p>
        </div>
        <p>{post.place}</p>
      </div>
      <div className="event-name">
        <div className="d-flex">
        <i className="bi bi-tag"></i>
          <p className="mb-0 fw-bold ms-2">category</p>
        </div>
        <p>{post.category}</p>
      </div>

        {/* <h1>{post.name}</h1>
        <p className="text-primary">
          Posted {moment(post.createdAt).fromNow()}
        </p>
        <p className="desc">{post.description}</p>

        <div className="d-flex justify-content-between mt-1">
          <div className="mt-2 me-3">
            <button
              onClick={handleBookmark}
              className="btn btn-info text-light"
            >
              Save post
            </button>
          </div>

          <div className="d-flex mb-3 ">
            <div className="me-3 mt-2">
              <a
                target="_blank"
                rel="noreferrer"
                className="btn btn-info text-light"
                href={post.detailsLink}
              >
                More details
              </a>
            </div>

            <div className="me-2 mt-2">
              <a
                target="_blank"
                rel="noreferrer"
                className="btn btn-info text-light"
                href={post.registrationLink}
              >
                Register Now
              </a>
            </div>
          </div>
        </div> */}
      </div>
      <div className="col-8">
        {post.description}
        <div className="d-flex justify-content-between mt-1">
          <div className="mt-2 me-3">
            <button
              onClick={handleBookmark}
              className="btn btn-info text-light"
            >
              Save post
            </button>
          </div>

          <div className="d-flex mb-3 ">
            <div className="me-3 mt-2">
              <a
                target="_blank"
                rel="noreferrer"
                className="btn btn-info text-light"
                href={post.detailsLink}
              >
                More details
              </a>
            </div>

            <div className="me-2 mt-2">
              <a
                target="_blank"
                rel="noreferrer"
                className="btn btn-info text-light"
                href={post.registrationLink}
              >
                Register Now
              </a>
            </div>
          </div>
        </div> 
      </div>
    </div>
  );
};

export default Post;
