import React from 'react'
import "./post.scss"
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Comments from '../Comments/Comments';


const Post = ({post}) => {

//temporary
const liked= false

  return (

       <div className="post">
        <div className="container">
       <div className="user">
        <div className="userInfo">
            <img src={post.profilePic} alt="" />
            <div className="details">
                <link to={`/profile/${post.userId}`} style={{textDecoration: "none", color: "inherit"}}>

                <span className='name'>{post.name}</span>
                </link>
                <span className='date'>1 min ago</span>
               
            </div>
        </div>
        <MoreHorizIcon/>
       </div>
       <div className="content">
        <p>{post.desc}</p>
        <img src={post.img} alt="" />
       </div>
       <div className="imfo">
        <div className="items">
{liked ?  <FavoriteOutlinedIcon/> : <FavoriteBorderOutlinedIcon/>}
         32 Likes
        </div>
        <div className="items">
        <TextsmsOutlinedIcon/>
         17 Comments
        </div>
        <div className="items">
        <ShareOutlinedIcon/>
         12 Share
        </div>
       </div>
       {<Comments/>}
    </div>
    </div>
  );
};

export default Post
