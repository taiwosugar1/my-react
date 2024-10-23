import React, { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db, storage } from "../../firebase"; // Ensure storage is imported
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "./AddPost.css";

const AddPost = () => {
  const [desc, setDesc] = useState("");
  const [media, setMedia] = useState(null); // For both image and video
  const [mediaType, setMediaType] = useState(""); // Track media type (image/video)
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    const currentUser = auth.currentUser;
    if (!currentUser) return;

    setIsLoading(true);
    setError("");

    try {
      let mediaUrl = "";

      // Upload the media (image or video) to Firebase Storage if it exists
      if (media) {
        const isVideo = media.type.startsWith("video/");
        const folder = isVideo ? "videos" : "images"; // Separate folder for videos and images
        const storageRef = ref(storage, `${folder}/${media.name}`);
        const snapshot = await uploadBytes(storageRef, media);
        mediaUrl = await getDownloadURL(snapshot.ref); // Get download URL for media
      }

      // Add post data to Firestore
      await addDoc(collection(db, "posts"), {
        desc,
        media: mediaUrl, // Store the media URL (either image or video)
        mediaType, // Save media type as well (image or video)
        userId: currentUser.uid,
        name: currentUser.displayName,
        profilePic: currentUser.photoURL,
        timestamp: serverTimestamp(),
        likes: 0,
        commentsCount: 0,
        likedBy: [],
        shares: 0 // Initialize shares count
      });

      // Alert user for successful post
      alert("Posted successfully!");

      // Reset form fields
      setDesc("");
      setMedia(null);
      setMediaType("");
      document.querySelector('input[type="file"]').value = ""; // Clear the file input
    } catch (error) {
      console.error("Error adding post: ", error);
      setError("Failed to add post. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check if the selected file is an image or a video
    const fileType = file.type.startsWith("video/") ? "video" : "image";
    setMedia(file); // Set the selected file as media
    setMediaType(fileType); // Set the media type (image or video)
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
        accept="image/*, video/*" // Accept both image and video files
        onChange={handleFileChange}
      />
      <button onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? "Posting..." : "Post"}
      </button>
    </div>
  );
};

export default AddPost;
