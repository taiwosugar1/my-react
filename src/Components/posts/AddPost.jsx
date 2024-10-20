import React, { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db, storage } from "../../firebase"; // Ensure storage is imported
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "./AddPost.css";

const AddPost = () => {
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    const currentUser = auth.currentUser;
    if (!currentUser) return;

    setIsLoading(true);
    setError("");

    try {
      let imgUrl = "";

      // Upload the image to Firebase Storage if it exists
      if (img) {
        const storageRef = ref(storage, `images/${img.name}`);
        const snapshot = await uploadBytes(storageRef, img);
        imgUrl = await getDownloadURL(snapshot.ref); // Get image download URL
      }

      // Add post data to Firestore
      await addDoc(collection(db, "posts"), {
        desc,
        img: imgUrl, // Store the image URL (or empty string if no image)
        userId: currentUser.uid,
        name: currentUser.displayName,
        profilePic: currentUser.photoURL,
        timestamp: serverTimestamp(),
        likes: 0,
        commentsCount: 0,
        likedBy: []
      });

      // Alert user for successful post
      alert("Posted successfully!");

      // Reset form fields
      setDesc("");
      setImg(null);
    } catch (error) {
      console.error("Error adding post: ", error);
      setError("Failed to add post. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="addPost">
      <h2>Create a Post</h2>
      {error && <p className="error">{error}</p>}
      <textarea
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        placeholder="What's on your mind?"
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImg(e.target.files[0])}
      />
      <button onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? "Posting..." : "Post"}
      </button>
    </div>
  );
};

export default AddPost;
