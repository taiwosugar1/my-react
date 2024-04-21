import React, { useContext } from 'react'
import './Navbar.scss'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import { Link } from 'react-router-dom';
import { DarkModeContext } from '../../context/DarkModeContext';
import { AuthContext } from '../../context/authContext';


const Navbar = () => {

   const {toggle, DarkMode} = useContext(DarkModeContext);
   const {currentUser } = useContext(AuthContext);
   
   

  return (
 <div className="navbar">

  <div className="left">
    <Link to="/" style={{textDecoration:"none"}}>
     <span>Multibrand App</span>
     </Link>
     <HomeOutlinedIcon style={{cursor: "pointer"}}/>
     <DarkModeOutlinedIcon onClick={toggle} style={{cursor: "pointer"}}/>
     <GridViewOutlinedIcon style={{cursor: "pointer"}}/>
     <WbSunnyOutlinedIcon style={{cursor: "pointer"}}/>


     <div className="search">
      <SearchOutlinedIcon style={{cursor: "pointer"}}/>
      <input type="text" placeholder='Search...'/>
     </div>
     
  </div>

  <div className="right">
     <PersonOutlinedIcon style={{cursor: "pointer"}}/>
     <EmailOutlinedIcon style={{cursor: "pointer"}}/>
     <NotificationsOutlinedIcon style={{cursor: "pointer"}}/>
     <div className="user">

     <img src={currentUser.profilePic } alt="" />
       
      <span>{currentUser.name}</span>
     </div>
  </div>

 </div>
  )
}

export default Navbar