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


const Navbar = () => {

   const {toggle} = useContext(DarkModeContext);
   

  return (
 <div className="navbar">

  <div className="left">
    <Link to="/" style={{textDecoration:"none"}}>
     <span>Multibrand App</span>
     </Link>
     <HomeOutlinedIcon/>
     <DarkModeOutlinedIcon onClick={toggle}/>
     <GridViewOutlinedIcon/>
     <WbSunnyOutlinedIcon/>


     <div className="search">
      <SearchOutlinedIcon/>
      <input type="text" placeholder='Search...'/>
     </div>
     
  </div>

  <div className="right">
     <PersonOutlinedIcon/>
     <EmailOutlinedIcon/>
     <NotificationsOutlinedIcon/>
     <div className="user">

     <img src="https://images.pexels.com/photos/287240/pexels-photo-287240.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
       
      <span>Oguntoyinbo Taiwo</span>
     </div>
  </div>

 </div>
  )
}

export default Navbar