import "./Profile.scss"
import FacebookTwoToneIcon from '@mui/icons-material/FacebookTwoTone';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import PinterestIcon from '@mui/icons-material/Pinterest';
import XIcon from '@mui/icons-material/X';
import PlaceIcon from '@mui/icons-material/Place';
import LanguageIcon from '@mui/icons-material/Language';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Posts from "../../Components/posts/Posts";


const Profile = () => {
  return (
    <div className='profile'>
      <div className="images">
        <img src="https://images.pexels.com/photos/2418479/pexels-photo-2418479.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" className='cover' />
        <img src="https://images.pexels.com/photos/768114/pexels-photo-768114.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className='profilePic'/>
      </div>
      <div className="profileContainer">
        <div className="userInfo">
          <div className="left">
            <a href="http://facebook.com">
              <FacebookTwoToneIcon fontSize='large'/>
            </a>
            <a href="http://instagram.com">
              <InstagramIcon fontSize='large'/>
            </a>
            <a href="http://pinterest.com">
              <PinterestIcon fontSize='large'/>
            </a>
            <a href="http://linkedin.com">
              <LinkedInIcon fontSize='large'/>
            </a>
            <a href="http://x.com">
              <XIcon fontSize='large'/>
            </a>
            <a href="http://gmail.com">
              <EmailOutlinedIcon fontSize='large'/>
            </a>
            
          </div>
          <div className="center">
            <span>Kolawole Ayobami</span>
            <div className="info">
              <div className="item">
              <PlaceIcon/>
              </div>
              <div className="item">
              <LanguageIcon/>
              <span>multibrand.dev</span>
              </div>
              <button>follow</button>
            </div>
          </div>


          <div className="right">
          <a href="http://gmail.com">
              <EmailOutlinedIcon fontSize='large'/>
            </a>
            <MoreVertIcon/>
          </div>
          
        </div>
      </div>
      <Posts/>
    </div>
  )
}

export default Profile
