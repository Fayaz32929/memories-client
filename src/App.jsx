import React, { useEffect, useState } from "react";
import { Container, AppBar, Typography, Grow, Grid } from "@mui/material";
import memories from "./images/memories.png";
import Posts from "./components/Posts/Posts";
import Form from "./components/Form/Form";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import { getPosts } from "./actions/posts";
import Card from "./card";

export default function App() {
 const [currentId, setCurrentId] = useState();
 const classes = useStyles();
 const dispatch = useDispatch();

 useEffect(() => {
  dispatch(getPosts());
 }, [currentId, dispatch]);
 return (
  <>
   <div className="max-w-7xl ml-auto mr-auto">
    <nav className="flex flex-row my-8 bg-white items-center  rounded-2xl py-2 justify-center">
     <h2 className="items-center text-sky-500 text-6xl font-normal "> Memories</h2>

     <img className="max-w-none " width="60" src={memories} />
    </nav>
    <div className="block  sm:flex sm:flex-row-reverse">
     <div className="basis-full sm:basis-1/3 lg:basis-1/4">
      <Form currentId={currentId} />
     </div>
     <div className="basis-full sm:basis-2/3 lg:basis-3/4">
      <Posts setCurrentId={setCurrentId} />
     </div>
    </div>
   </div>
   {/* <Container maxWidth="lg">
    <AppBar className={classes.appBar} position="static" color="inherit">
     <Typography className={classes.heading} variant="h2" align="center">
      Memories
     </Typography>
     <img className={classes.image} src={memories} alt="memories" height="60" />
    </AppBar>
    <Grow in>
     <Container>
      <Grid className={classes.mainContainer} container justifyContent="space-between" alignItems="stretch" spacing={3}>
       <Grid item xs={12} sm={7}>
        <Posts setCurrentId={setCurrentId} />
       </Grid>
       <Grid item xs={12} sm={4}>
        <Form currentId={currentId} setCurrentId={setCurrentId} />
       </Grid>
      </Grid>
     </Container>
    </Grow>
   </Container> */}
  </>
 );
}
