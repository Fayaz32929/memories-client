import React, { useEffect, useState } from "react";
import { TextField, Button, Typography, Paper } from "@mui/material";
import FileBase from "react-file-base64";
import { createPost, updatePost } from "../../actions/posts";
import { useDispatch, useSelector } from "react-redux";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Post from "./../Posts/Post/Post";

export default function Form({ currentId, setCurrentId }) {
 const [imageUploaded, setImageUploaded] = useState(false);
 const [postData, setPostData] = useState({ creater: "", title: "", message: "", tags: "", selectedFile: "" });
 const post = useSelector((state) => (currentId ? state.posts.find((p) => p._id === currentId) : null));
 const dispatch = useDispatch();
 console.log(currentId);
 useEffect(() => {
  if (post) setPostData(post);
 }, [post]);
 const handleSubmit = (e) => {
  e.preventDefault();

  if (currentId) {
   dispatch(updatePost(currentId, postData));
   setCurrentId();
  } else {
   dispatch(createPost(postData));
  }
  clear();
 };
 const clear = () => {
  setPostData({ creater: "", title: "", message: "", tags: "", selectedFile: "" });
  setImageUploaded(false);
 };

 const handlebase64 = async (e) => {
  const file = e.target.files[0];
  const base64 = await convertToBase64(file);
  console.log(base64);
  setPostData({ ...postData, selectedFile: base64 });
  setImageUploaded(true);
 };
 const fil = new FileReader();
 console.log(fil);
 const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
   const fileReader = new FileReader();
   fileReader.readAsDataURL(file);
   fileReader.onload = () => {
    resolve(fileReader.result);
   };
   fileReader.onerror = (error) => {
    reject(error);
   };
  });
 };
 return (
  <>
   <form className="bg-white flex max-w-md flex-wrap gap-4 justify-center p-3">
    <h2 className="font-medium text-lg">{currentId ? "Editing" : "Creating"} a Memory</h2>
    <TextField
     className="w-11/12"
     name="creator"
     label="Creater"
     value={postData.creater}
     onChange={(e) => setPostData({ ...postData, creater: e.target.value })}
    />
    <TextField
     className="w-11/12"
     name="title"
     label="Title"
     value={postData.title}
     onChange={(e) => setPostData({ ...postData, title: e.target.value })}
    />
    <TextField
     className="w-11/12"
     label="Message"
     name="message"
     value={postData.message}
     onChange={(e) => setPostData({ ...postData, message: e.target.value })}
     multiline
    />

    <TextField
     className="w-11/12"
     label="Tags"
     name="tags"
     value={postData.tags}
     onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(",") })}
    />

    <div className="flex flex-col justify-center">
     <Button
      className="relative cursor-pointer flex-grow-0 overflow-hidden py-0"
      component="label"
      variant="contained"
      fullWidth
      startIcon={<CloudUploadIcon />}
      disabled={imageUploaded}
     >
      <input
       className="absolute right-0 top-0 invisible cursor-pointer  scale-x-150"
       type="file"
       onChange={handlebase64}
       multiple={false}
      />
      Upload Image
     </Button>
     <div className="max-h-40">
      {postData.selectedFile ? (
       <img className="m-2  max-h-40" height="160" src={postData.selectedFile} />
      ) : (
       <p className=" m-4">Image not selected</p>
      )}
     </div>
    </div>
    <Button type="submit" variant="contained" onClick={handleSubmit} fullWidth size="large">
     Submit
    </Button>
    <Button onClick={clear} type="submit" fullWidth color="error" size="small" variant="outlined">
     Clear
    </Button>
   </form>
  </>
 );
}
