import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { AuthContext } from "../../context/authContext"; 
import "./Profile.css";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import XIcon from "@mui/icons-material/X";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../Components/posts/Posts"; // Posts component

const Profile = () => {
  const { userId } = useParams(); // Get userId from URL parameters
  const { currentUser } = useContext(AuthContext); // Get current logged-in user from context
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(null); // Profile data
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch user profile from Firestore
  useEffect(() => {
    const fetchUserProfile = async () => {
      const uidToFetch = userId || currentUser?.uid;
      if (!uidToFetch) {
        setLoading(false);
        return;
      }

      try {
        const userDoc = await getDoc(doc(db, "users", uidToFetch));
        if (userDoc.exists()) {
          setUserProfile(userDoc.data()); // Set fetched profile data
        } else {
          console.error("No user found with the provided ID.");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }

      setLoading(false);
    };

    fetchUserProfile();
  }, [userId, currentUser]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userProfile) {
    return <div>No profile data available.</div>;
  }

  return (
    <div className="profile">
      <div className="images">
        <img src={userProfile.coverPhoto || "https://via.placeholder.com/600"} alt="Cover" className="cover" />
        <img src={userProfile.profilePic || "https://via.placeholder.com/150"} alt="Profile" className="profilePic" />
      </div>

      <div className="profileContainer">
        <div className="userInfo">
          <div className="leeft">
            {userProfile.facebook && <a href={userProfile.facebook} target="_blank" rel="noopener noreferrer"><FacebookTwoToneIcon fontSize="large" /></a>}
            {userProfile.instagram && <a href={userProfile.instagram} target="_blank" rel="noopener noreferrer"><InstagramIcon fontSize="large" /></a>}
            {userProfile.pinterest && <a href={userProfile.pinterest} target="_blank" rel="noopener noreferrer"><PinterestIcon fontSize="large" /></a>}
            {userProfile.linkedin && <a href={userProfile.linkedin} target="_blank" rel="noopener noreferrer"><LinkedInIcon fontSize="large" /></a>}
            {userProfile.x && <a href={userProfile.x} target="_blank" rel="noopener noreferrer"><XIcon fontSize="large" /></a>}
          </div>

          <div className="center">
            <span>{userProfile.username || userProfile.name || "Unknown User"}</span>
            <div className="info">
              <div className="item">
                <PlaceIcon />
                <span>{userProfile.location || "Unknown Location"}</span>
              </div>
              <div className="item">
                <LanguageIcon />
                <span>{userProfile.website || "No Website"}</span>
              </div>
            </div>
            <button>Follow</button>
          </div>

          <div className="riight">
            <a href={`mailto:${userProfile.email}`}>
              <EmailOutlinedIcon fontSize="large" />
            </a>
            <MoreVertIcon />
          </div>
        </div>

        {currentUser?.uid === userId && (
          <div className="editProfileBtn">
            <button onClick={() => navigate(`/edit-profile/${userId}`)}>Edit Profile</button>
          </div>
        )}
      </div>

      {/* User's posts filtered by userId for profile */}
      <Posts userId={userId || currentUser?.uid} isProfile={true} />
    </div>
  );
};

export default Profile;
