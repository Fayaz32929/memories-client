import React from "react";
import Post from "./Post/Post";
import useStyles from "./style";
import { Grid, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";

export default function Posts({ setCurrentId }) {
 const posts = useSelector((state) => state.posts);
 const classes = useStyles();
 return !posts.length ? (
  <CircularProgress />
 ) : (
  <Grid className={classes.mainContainer} container alignItems="stretch" spacing={3}>
   {posts.map((post) => (
    <Grid key={post._id} item xs={12} sm={6}>
     <Post setCurrentId={setCurrentId} post={post} />
    </Grid>
   ))}
  </Grid>
 );
}
