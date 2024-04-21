/* eslint-disable no-empty-pattern */
import React, { useState } from 'react'
import "./post.scss"
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Link } from 'react-router-dom';
 import Comments from '../Comments/Comments';


 
const Post = ({ post }) =>{
  const  [commentOpen, setCommentOpen]=useState(false)

  //temporary
  const liked = false;

  return (

    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={post.profilePic} alt="" />
            <div className="details">
              
              <Link to={`/profile/${post.userId}`}
              style={{textDecoration:"none", color:"inherit"}}>
                <span className='name'>{post.name}</span>
                </Link>
              <span className='date'>1 min ago</span>

            </div>
          </div>
          <MoreHorizIcon />
        </div>
        <div className="content">
          <p>{post.desc}</p>
          <img src={post.img} alt="" />
        </div>
        <div className="info">
          <div className="items" onClick={()=>setCommentOpen(!commentOpen)}>
            {liked ? <FavoriteOutlinedIcon /> : <FavoriteBorderOutlinedIcon />}
            32 Likes
          </div>
          <div className="items">
            <TextsmsOutlinedIcon />
            17 Comments
          </div>
          <div className="items">
            <ShareOutlinedIcon />
            12 Share
          </div>
        </div>
       {commentOpen && <Comments />}
      </div>
      
    </div>
  );
}

export default Post

