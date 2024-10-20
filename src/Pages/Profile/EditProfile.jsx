import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { storage } from '../../firebase'; // Import your Firebase storage
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Import storage functions
import './EditProfile.css';

const EditProfile = () => {
  const { userId } = useParams(); // Get user ID from URL
  const navigate = useNavigate(); // Hook to navigate after save
  const [profileData, setProfileData] = useState({
    name: '',
    location: '',
    website: '',
    facebook: '',
    instagram: '',
    pinterest: '',
    linkedin: '',
    x: '',
    email: '',
    profilePic: '', // Field for profile picture
    coverPhoto: '', // Field for cover photo
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [imageFile, setImageFile] = useState(null); // State for profile image file
  const [coverFile, setCoverFile] = useState(null); // State for cover image file

  useEffect(() => {
    // Fetch current user data to pre-fill the form
    const fetchUserProfile = async () => {
      try {
        const userDoc = doc(db, 'users', userId);
        const userSnap = await getDoc(userDoc);
        if (userSnap.exists()) {
          setProfileData(userSnap.data());
        } else {
          console.error('No such user!');
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setError('Error loading profile data.');
      }
      setLoading(false);
    };

    fetchUserProfile();
  }, [userId]);

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]); // Set the selected profile image file
  };

  const handleCoverChange = (e) => {
    setCoverFile(e.target.files[0]); // Set the selected cover image file
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const userDoc = doc(db, 'users', userId);

      // Handle profile image upload
      if (imageFile) {
        const storageRef = ref(storage, `profileImages/${userId}`); // Create a reference for the profile image
        await uploadBytes(storageRef, imageFile); // Upload the profile image file
        const imageUrl = await getDownloadURL(storageRef); // Get the download URL
        profileData.profilePic = imageUrl; // Set the profilePic field in the profileData
      }

      // Handle cover photo upload
      if (coverFile) {
        const coverRef = ref(storage, `coverPhotos/${userId}`); // Create a reference for the cover photo
        await uploadBytes(coverRef, coverFile); // Upload the cover photo file
        const coverUrl = await getDownloadURL(coverRef); // Get the download URL
        profileData.coverPhoto = coverUrl; // Set the coverPhoto field in the profileData
      }

      await updateDoc(userDoc, profileData); // Update the user document
      alert('Profile updated successfully!');
      navigate(`/profile/${userId}`); // Redirect back to profile page
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Error updating profile.');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="editProfile">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSave}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={profileData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Location:
          <input
            type="text"
            name="location"
            value={profileData.location}
            onChange={handleChange}
          />
        </label>
        <label>
          Website:
          <input
            type="text"
            name="website"
            value={profileData.website}
            onChange={handleChange}
          />
        </label>
        <label>
          Facebook:
          <input
            type="url"
            name="facebook"
            value={profileData.facebook}
            onChange={handleChange}
          />
        </label>
        <label>
          Instagram:
          <input
            type="url"
            name="instagram"
            value={profileData.instagram}
            onChange={handleChange}
          />
        </label>
        <label>
          Pinterest:
          <input
            type="url"
            name="pinterest"
            value={profileData.pinterest}
            onChange={handleChange}
          />
        </label>
        <label>
          LinkedIn:
          <input
            type="url"
            name="linkedin"
            value={profileData.linkedin}
            onChange={handleChange}
          />
        </label>
        <label>
          X (formerly Twitter):
          <input
            type="url"
            name="x"
            value={profileData.x}
            onChange={handleChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={profileData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Profile Picture:
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange} // Handle profile image selection
          />
        </label>
        <label>
          Cover Photo:
          <input
            type="file"
            accept="image/*"
            onChange={handleCoverChange} // Handle cover photo selection
          />
        </label>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditProfile;
