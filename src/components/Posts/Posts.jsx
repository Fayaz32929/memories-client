import React from "react";
import Post from "./Post/Post";
import { Grid, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";

export default function Posts({ setCurrentId }) {
 const posts = useSelector((state) => state.posts);
 return !posts.length ? (
  <CircularProgress />
 ) : (
  <div className="flex flex-wrap gap-4">
   {posts.map((post) => (
    <Post key={post._id} post={post} setCurrentId={setCurrentId} />
   ))}
  </div>
 );
}
