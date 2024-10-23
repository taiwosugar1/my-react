import React, { useState, useEffect } from "react";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
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
  const [shareCount, setShareCount] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [shareOptionsOpen, setShareOptionsOpen] = useState(false); // State for share options

  const currentUser = auth.currentUser;

  // Fetch initial post data and set likes/comments/share count
  useEffect(() => {
    const postDocRef = doc(db, "posts", post.id);

    const unsubscribe = onSnapshot(postDocRef, (snapshot) => {
      if (snapshot.exists()) {
        const postData = snapshot.data();
        setLikeCount(postData.likes || 0);
        setCommentsCount(postData.commentsCount || 0);
        setShareCount(postData.shares || 0);

        if (postData.likedBy?.includes(currentUser?.uid)) {
          setLiked(true);
        } else {
          setLiked(false);
        }
      }
    });

    return () => unsubscribe();
  }, [post.id, currentUser]);

  // Handle like/unlike logic
  const handleLike = async () => {
    if (!currentUser) return;

    const postRef = doc(db, "posts", post.id);

    try {
      if (liked) {
        await updateDoc(postRef, {
          likes: likeCount,
          likedBy: arrayRemove(currentUser.uid),
        });
        setLiked(false);
        setLikeCount((prev) => prev - 1);
      } else {
        await updateDoc(postRef, {
          likes: likeCount,
          likedBy: arrayUnion(currentUser.uid),
        });
        setLiked(true);
        setLikeCount((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Error updating like status: ", error);
    }
  };

  // Handle post deletion
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

  // Handle sharing the post
  const handleShare = async (option) => {
    const postUrl = `https://yourapp.com/posts/${post.id}`;

    switch (option) {
      case "copy":
        navigator.clipboard.writeText(postUrl);
        alert("Post URL copied to clipboard!");
        break;
      case "facebook":
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`, '_blank');
        break;
      case "twitter":
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}`, '_blank');
        break;
        
        case "shareToFeed":
          // Additional share logic if needed
          alert("Post shared to your feed!"); // This could also include logic to create a new post in the user's feed
          break;
        default:
        break;
    }

    await updateDoc(doc(db, "posts", post.id), {
      shares: shareCount,
    });
    setShareCount((prev) => prev + 1);
  };

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img
              src={post.profilePic || "https://via.placeholder.com/150"}
              alt={`${post.name}'s profile`}
              className="profilePic"
            />
            <div className="details">
              <Link
                to={`/profile/${post.userId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{post.username}</span>
              </Link>
              <span className="date">
                {new Date(post.timestamp?.toDate()).toLocaleString()}
              </span>
            </div>
          </div>
          <div className="more" onClick={() => setDropdownOpen(!dropdownOpen)}>
            <MoreHorizIcon />
            {dropdownOpen && (
              <div className="dropdown">
                {currentUser?.uid === post.userId && (
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
          {post.media && post.mediaType === "image" && (
            <img src={post.media} alt="Post content" />
          )}
          {post.media && post.mediaType === "video" && (
            <video
              src={post.media}
              controls
              width="100%"
              className="post-video"
              preload="auto"
            >
              Your browser does not support the video tag.
            </video>
          )}
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
          <div className="items" onClick={() => setShareOptionsOpen((prev) => !prev)}>
            <ShareOutlinedIcon />
            {shareCount} Shares
          </div>
        </div>
        {shareOptionsOpen && (
          <div className="share-options">
            <div className="share-item" onClick={() => handleShare('copy')}>Copy Link</div>
            <div className="share-item" onClick={() => handleShare('facebook')}>Share on Facebook</div>
            <div className="share-item" onClick={() => handleShare('twitter')}>Share on Twitter</div>
            <div className="share-item" onClick={() => handleShare("shareToFeed")}>
                Share to Your Feed
              </div>
          </div>
        )}
        {commentOpen && <Comments postId={post.id} />}
      </div>
    </div>
  );
};

export default Post;
