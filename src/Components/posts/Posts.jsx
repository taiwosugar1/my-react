import React, { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import Post from './Post'; 
import "./Posts.css";

const Posts = ({ userId, isProfile }) => {
  const [posts, setPosts] = useState([]); // Store posts
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const unsubscribe = () => {};

    const fetchPosts = async () => {
      try {
        let q;

        // Determine the query based on whether it's a profile or not
        if (isProfile && userId) {
          q = query(collection(db, 'posts'), where('userId', '==', userId)); // Fetch posts by userId for profile
        } else {
          q = collection(db, 'posts'); // Fetch all posts
        }

        // Subscribe to the query with onSnapshot for real-time updates
        unsubscribe = onSnapshot(q, (querySnapshot) => {
          const fetchedPosts = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setPosts(fetchedPosts);
          setLoading(false); // Set loading to false after fetching posts
        });
      } catch (error) {
        console.error('Error fetching posts:', error);
        setLoading(false); // Ensure loading is set to false on error
      }
    };

    fetchPosts();

    return () => unsubscribe(); // Cleanup the listener on component unmount
  }, [userId, isProfile]);

  if (loading) {
    return <div>Loading posts...</div>;
  }

  if (posts.length === 0) {
    return <div>No posts available.</div>;
  }

  return (
    <div className="posts" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "90%", margin: "auto" }}>
      {posts.map((post) => (
        <Post key={post.id} post={post} /> 
      ))}
    </div>
  );
};

export default Posts;
