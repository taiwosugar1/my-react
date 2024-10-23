import React, { useContext, useEffect, useState } from 'react';
import './Navbar.css'; // Update to .css
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebase';
import { AuthContext } from '../../context/authContext';
import { DarkModeContext } from '../../context/DarkModeContext'; // Import DarkModeContext
import { Search } from '@mui/icons-material';

const Navbar = () => {
  const { currentUser, setCurrentUser, logout } = useContext(AuthContext);
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext); // Extract dark mode state and toggle function
  const [loading, setLoading] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false); // State for toggling search bar
  const navigate = useNavigate();

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const userDoc = await db.collection('users').doc(user.uid).get();
          if (userDoc.exists) {
            setCurrentUser({
              uid: user.uid,
              name: userDoc.data().name,
              profilePic: userDoc.data().profilePic || 'default-profile-pic-url',
            });
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
      setLoading(false);
    };
    fetchUserData();
  }, [setCurrentUser]);

  // Logout
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Toggle search bar on mobile
  const toggleSearch = () => {
    setSearchOpen((prev) => !prev);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className={`navbar ${darkMode ? 'dark-mode' : ''}`}>
      <div className="lleft">
        <Link to="/" style={{ textDecoration: 'none' }} className='logo'>
          <span>Chat Naija</span>
        </Link>

        {/* Toggle between dark mode icons */}
        {darkMode ? (
          <span className="clickable dark">
           <WbSunnyOutlinedIcon onClick={toggleDarkMode} />
         </span>
        ) : (
          <span className="clickable dark">
           <DarkModeOutlinedIcon onClick={toggleDarkMode} />
          </span>
        )}

        {/* Search bar and toggle button for mobile */}
        <button className="search-toggle-btn" onClick={toggleSearch}>
          <Search />
        </button>
        <div className={`search ${searchOpen ? 'open' : ''}`}>
          <input type="text" placeholder="Search..." />
        </div>
      </div>

      <div className="rright">
        {currentUser ? (
          <>
            <button className="clickable friends" onClick={() => navigate('/friends')}>Friends</button>
           
           <span  className="clickable house">
               <Link to={"/home"}> <HomeOutlinedIcon /></Link>
           </span>

            <Link to={`/profile/${currentUser.uid}`} className="user">
              <img src={currentUser.profilePic || "https://via.placeholder.com/600" } alt={`${currentUser.name}'s profile`}  className='using'/>
              <span>{currentUser.name}</span>
            </Link>
            <button className="clickable logout" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="clickable logout">Login</Link>
            <Link to="/register" className="clickable register">Register</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
