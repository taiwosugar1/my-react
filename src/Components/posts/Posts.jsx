import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase';
import Post from './Post'; 
import "./Posts.css"

const Posts = ({ userId, isProfile }) => {
  const [posts, setPosts] = useState([]); // Store posts
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        let q;

        // Determine the query based on whether it's a profile or not
        if (isProfile && userId) {
          q = query(collection(db, 'posts'), where('userId', '==', userId)); // Fetch posts by userId for profile
        } else {
          q = collection(db, 'posts'); // Fetch all posts
        }

        const querySnapshot = await getDocs(q);
        const fetchedPosts = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setPosts(fetchedPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [userId, isProfile]);

  if (loading) {
    return <div>Loading posts...</div>;
  }

  if (posts.length === 0) {
    return <div>No posts available.</div>;
  }

  return (
    <div className="posts" style={{display: "flex", flexDirection:"column", alignItems:"center", justifyContent: "center" , width:"90%", margin:"auto"}} >
      {posts.map((post) => (
        <Post key={post.id} post={post} /> 
      ))}
    </div>
  );
};

export default Posts;
