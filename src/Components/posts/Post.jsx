import React, { useState, useEffect } from "react";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"; // Import the Delete icon
import { Link } from "react-router-dom";
import Comments from "../Comments/Comments";
import "./Post.css";
import { auth, db } from "../../firebase";
import {
  doc,
  updateDoc,
  onSnapshot,
  arrayUnion,
  arrayRemove,
  deleteDoc,
} from "firebase/firestore";

const Post = ({ post }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [commentsCount, setCommentsCount] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false); // For controlling the dropdown visibility

  const currentUser = auth.currentUser; // Get the current logged-in user

  // Fetch the initial post data and set likes/comments count
  useEffect(() => {
    const fetchPostData = async () => {
      const postDocRef = doc(db, "posts", post.id);

      // Use onSnapshot to listen for real-time updates
      const unsubscribe = onSnapshot(postDocRef, (snapshot) => {
        if (snapshot.exists()) {
          const postData = snapshot.data();
          setLikeCount(postData.likes || 0);
          setCommentsCount(postData.commentsCount || 0);

          // Check if the current user has liked the post
          if (postData.likedBy?.includes(currentUser?.uid)) {
            setLiked(true);
          } else {
            setLiked(false);
          }
        }
      });

      return () => unsubscribe(); // Cleanup on unmount
    };

    fetchPostData();
  }, [post.id, currentUser]);

  // Function to handle like/unlike logic
  const handleLike = async () => {
    if (!currentUser) return; // Ensure the user is logged in

    const postRef = doc(db, "posts", post.id);

    try {
      if (liked) {
        // Unlike the post: remove the user's ID from the likedBy array
        await updateDoc(postRef, {
          likes: likeCount - 1,
          likedBy: arrayRemove(currentUser.uid),
        });
        setLiked(false);
        setLikeCount((prev) => prev - 1);
      } else {
        // Like the post: add the user's ID to the likedBy array
        await updateDoc(postRef, {
          likes: likeCount + 1,
          likedBy: arrayUnion(currentUser.uid),
        });
        setLiked(true);
        setLikeCount((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Error updating like status: ", error);
    }
  };

  // Function to handle post deletion
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await deleteDoc(doc(db, "posts", post.id));
        alert("Post deleted successfully");
      } catch (error) {
        console.error("Error deleting post: ", error);
      }
    }
  };

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            {/* Display user profile picture */}
            <img
              src={post.profilePic || "https://via.placeholder.com/150"}
              alt={`${post.name}'s profile`}
              className="profilePic" // Add a class for styling
            />
            <div className="details">
              <Link
                to={`/profile/${post.userId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{post.username}</span> {/* Display user's name */}
              </Link>
              <span className="date">
                {new Date(post.timestamp?.toDate()).toLocaleString()} {/* Display post timestamp */}
              </span>
            </div>
          </div>
          <div className="more" onClick={() => setDropdownOpen(!dropdownOpen)}>
            <MoreHorizIcon />
            {dropdownOpen && (
              <div className="dropdown">
                {currentUser?.uid === post.userId && ( // Only show delete if current user is the post owner
                  <div className="dropdown-item" onClick={handleDelete}>
                    <DeleteOutlineIcon /> Delete Post
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="content">
          <p>{post.desc}</p>
          {post.img && <img src={post.img} alt="Post content" />} {/* Display post image if available */}
        </div>
        <div className="info">
          <div className="items" onClick={handleLike}>
            {liked ? (
              <FavoriteOutlinedIcon className="liked" />
            ) : (
              <FavoriteBorderOutlinedIcon />
            )}
            {likeCount} Likes
          </div>
          <div
            className="items"
            onClick={() => setCommentOpen((prev) => !prev)}
          >
            <TextsmsOutlinedIcon />
            {commentsCount} Comments
          </div>
          <div className="items">
            <ShareOutlinedIcon />
            12 Shares
          </div>
        </div>
        {commentOpen && <Comments postId={post.id} />} {/* Display comments section if open */}
      </div>
    </div>
  );
};

export default Post;
