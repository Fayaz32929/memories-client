import React from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../actions/posts";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
// import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton } from "@mui/material";

export default function Post({ post, setCurrentId }) {
 const dispatch = useDispatch();

 const postTime = moment(post.createdAt).fromNow();

 return (
  <Card sx={{ maxWidth: 345 }}>
   <CardHeader
    avatar={
     <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
      R
     </Avatar>
    }
    action={
     <button
      onClick={() => {
       setCurrentId(post._id);
      }}
      aria-label="settings"
     >
      <MoreVertIcon />
     </button>
    }
    title={post.creater}
    subheader={postTime}
   />
   <CardMedia component="img" height="194" image={post.selectedFile} />
   <CardContent>
    <Typography className="pt-2" variant="body2" color="text.secondary">
     {post.tags.map((tag) => ` #${tag} `)}
    </Typography>
    <Typography className="pt-2" variant="h5" color="text.primary">
     {post.title}
    </Typography>
    <Typography className="pt-2" variant="body2" color="text.secondary">
     {post.message}
    </Typography>
   </CardContent>
   <CardActions className="flex justify-between px-4" disableSpacing>
    <IconButton
     onClick={() => {
      dispatch(likePost(post._id));
     }}
     aria-label="add to favorites"
    >
     <FavoriteIcon />
     {post.likeCount}
    </IconButton>
    <button
     onClick={() => {
      dispatch(deletePost(post._id));
     }}
    >
     <DeleteOutlineIcon />
     Delete
    </button>
   </CardActions>
  </Card>
 );
}
