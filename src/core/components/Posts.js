import React, { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";
import Pagination from "./pagination/Pagination";

import dotenv from "dotenv";
import Post from "./Post/Post";
dotenv.config();

const Posts = (props) => {
  const [posts, setPosts] = useState([]);
  const getPosts = async () => {
    try {
      const userPosts = await axios.get(
        `${process.env.REACT_APP_DEPLOYED_API}/post`
      );
        setPosts(userPosts.data.reverse());
       // set State
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {

  const getPosts = async () => {
    getPosts();
  }, []);
  useEffect(() => {
    if (props.type.length>0 && props.type!=="all") {
      const filteredPost = posts.filter(post=>{
        console.log(post.category,props.type,post.category!==props.type)
        return post.category===props.type
      })
      console.log({filteredPost})
      setPosts(filteredPost.reverse());
    }
    if (props.type.length>0 && props.type==="all") {
      getPosts();
    }
  }, [props.type]);
  return !posts.length ? (
    <CircularProgress />
  ) : (
    <Pagination
      data={posts}
      pageLimit={Math.ceil(posts.length / 3)}
      dataLimit={3}
      Component = {Post}
    />
  );
};

export default Posts;
