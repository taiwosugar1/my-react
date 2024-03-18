/* eslint-disable no-empty-pattern */
import React from 'react'
import "./post.scss"
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
 import Comments from '../Comments/Comments';


function Post({ }) {

  //temporary
  const liked = true;

  return (

    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src="https://images.pexels.com/photos/163443/war-desert-guns-gunshow-163443.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
            <div className="details">
              

                <span className='name'>Shola Agbaje</span>
            
              <span className='date'>1 min ago</span>

            </div>
          </div>
          <MoreHorizIcon />
        </div>
        <div className="content">
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis, iusto.</p>
          <img src="https://images.pexels.com/photos/163443/war-desert-guns-gunshow-163443.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
        </div>
        <div className="info">
          <div className="items">
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
        
      </div>
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src="https://images.pexels.com/photos/163443/war-desert-guns-gunshow-163443.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
            <div className="details">
              

                <span className='name'>Shola Agbaje</span>
            
              <span className='date'>1 min ago</span>

            </div>
          </div>
          <MoreHorizIcon />
        </div>
        <div className="content">
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis, iusto.</p>
          <img src="https://images.pexels.com/photos/8101971/pexels-photo-8101971.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
        </div>
        <div className="info">
          <div className="items">
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
        <Comments />
      </div>
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src="https://images.pexels.com/photos/163443/war-desert-guns-gunshow-163443.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
            <div className="details">
              

                <span className='name'>Shola Agbaje</span>
            
              <span className='date'>1 min ago</span>

            </div>
          </div>
          <MoreHorizIcon />
        </div>
        <div className="content">
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis, iusto.</p>
          <img src="https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
        </div>
        <div className="info">
          <div className="items">
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
        
      </div>
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src="https://images.pexels.com/photos/163443/war-desert-guns-gunshow-163443.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
            <div className="details">
              

                <span className='name'>Shola Agbaje</span>
            
              <span className='date'>1 min ago</span>

            </div>
          </div>
          <MoreHorizIcon />
        </div>
        <div className="content">
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis, iusto.</p>
          <img src="https://images.pexels.com/photos/1216482/pexels-photo-1216482.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
        </div>
        <div className="info">
          <div className="items">
            {liked ? <FavoriteOutlinedIcon /> : <FavoriteBorderOutlinedIcon />}
            32 Likes
          </div>
          <div className="items">
            <TextsmsOutlinedIcon />
            
          </div>
          <div className="items">
            <ShareOutlinedIcon />
            12 Share
          </div>
        </div>
      
      </div>
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src="https://images.pexels.com/photos/163443/war-desert-guns-gunshow-163443.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
            <div className="details">
              

                <span className='name'>Shola Agbaje</span>
            
              <span className='date'>1 min ago</span>

            </div>
          </div>
          <MoreHorizIcon />
        </div>
        <div className="content">
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis, iusto.</p>
          <img src="https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
        </div>
        <div className="info">
          <div className="items">
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
        <Comments />
      </div>
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src="https://images.pexels.com/photos/163443/war-desert-guns-gunshow-163443.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
            <div className="details">
              

                <span className='name'>Shola Agbaje</span>
            
              <span className='date'>1 min ago</span>

            </div>
          </div>
          <MoreHorizIcon />
        </div>
        <div className="content">
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis, iusto.</p>
          <img src="https://images.pexels.com/photos/5453848/pexels-photo-5453848.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
        </div>
        <div className="info">
          <div className="items">
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
        <Comments />
      </div>
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src="https://images.pexels.com/photos/3345882/pexels-photo-3345882.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
            <div className="details">
              

                <span className='name'>Shola Agbaje</span>
            
              <span className='date'>1 min ago</span>

            </div>
          </div>
          <MoreHorizIcon />
        </div>
        <div className="content">
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis, iusto.</p>
          <img src="https://media.istockphoto.com/id/1344954298/photo/family-with-dog-in-the-car.jpg?s=612x612&w=0&k=20&c=anIzsubkI7wzUiSHC_gUIVyJuSX2KXJ1-Lu5c25CCzA=" alt="" />
        </div>
        <div className="info">
          <div className="items">
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
      
      </div>
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src="https://images.pexels.com/photos/163443/war-desert-guns-gunshow-163443.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
            <div className="details">
              

                <span className='name'>Shola Agbaje</span>
            
              <span className='date'>1 min ago</span>

            </div>
          </div>
          <MoreHorizIcon />
        </div>
        <div className="content">
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis, iusto.</p>
          <img src="https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
        </div>
        <div className="info">
          <div className="items">
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
        
      </div>
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src="https://images.pexels.com/photos/163443/war-desert-guns-gunshow-163443.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
            <div className="details">
              

                <span className='name'>Shola Agbaje</span>
            
              <span className='date'>1 min ago</span>

            </div>
          </div>
          <MoreHorizIcon />
        </div>
        <div className="content">
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis, iusto.</p>
          <img src="https://images.pexels.com/photos/4259140/pexels-photo-4259140.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
        </div>
        <div className="info">
          <div className="items">
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
        <Comments />
      </div>
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src="https://images.pexels.com/photos/163443/war-desert-guns-gunshow-163443.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
            <div className="details">
              

                <span className='name'>Shola Agbaje</span>
            
              <span className='date'>1 min ago</span>

            </div>
          </div>
          <MoreHorizIcon />
        </div>
        <div className="content">
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis, iusto.</p>
          <img src="https://images.pexels.com/photos/4262424/pexels-photo-4262424.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
        </div>
        <div className="info">
          <div className="items">
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
        
      </div>
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src="https://images.pexels.com/photos/163443/war-desert-guns-gunshow-163443.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
            <div className="details">
              

                <span className='name'>Shola Agbaje</span>
            
              <span className='date'>1 min ago</span>

            </div>
          </div>
          <MoreHorizIcon />
        </div>
        <div className="content">
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis, iusto.</p>
          <img src="https://images.pexels.com/photos/6434622/pexels-photo-6434622.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
        </div>
        <div className="info">
          <div className="items">
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

      </div>
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src="https://images.pexels.com/photos/163443/war-desert-guns-gunshow-163443.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
            <div className="details">
              

                <span className='name'>Shola Agbaje</span>
            
              <span className='date'>1 min ago</span>

            </div>
          </div>
          <MoreHorizIcon />
        </div>
        <div className="content">
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis, iusto.</p>
          <img src="https://images.pexels.com/photos/163443/war-desert-guns-gunshow-163443.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
        </div>
        <div className="info">
          <div className="items">
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
        <Comments />
      </div>
    </div>
  );
}

export default Post
