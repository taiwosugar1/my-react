import React, { useContext } from 'react';
import './Footer.css';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import { DarkModeContext } from '../../context/DarkModeContext';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';

const Footer = () => {
  const { currentUser } = useContext(AuthContext);
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

  return (
    <div className="footer">
      <Link to="/home">
        <HomeOutlinedIcon className="footer-icon" />
      </Link>

      <Link to="/friends">
        <PeopleOutlineIcon className="footer-icon" />
      </Link>

      {darkMode ? (
        <WbSunnyOutlinedIcon onClick={toggleDarkMode} className="footer-icon" />
      ) : (
        <DarkModeOutlinedIcon onClick={toggleDarkMode} className="footer-icon" />
      )}

      <Link to="/friends">
        <ChatBubbleOutlineIcon className="footer-icon" />
      </Link>

      {currentUser ? (
        <Link to={`/profile/${currentUser.uid}`} className="user">
          <img src={currentUser.profilePic || "https://via.placeholder.com/600"} alt="profile" />
        </Link>
      ) : (
        <Link to="/login">
          <span>Login</span>
        </Link>
      )}
    </div>
  );
};

export default Footer;
