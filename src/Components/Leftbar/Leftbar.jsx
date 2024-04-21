
import './Leftbar.scss'
import Friends from '../../Asset/friends.png'
import Group from '../../Asset/group.png'
import Message from '../../Asset/message.jpg'
import Market from '../../Asset/market.png'
import Gallery from '../../Asset/gallery.jpg'
import Videos from '../../Asset/videos.jpg'
import Gaming from '../../Asset/gaming.jpg'
import Watch from '../../Asset/watch.jpg'
import Fund from '../../Asset/fund.jpg'
import { AuthContext } from '../../context/authContext'
import { useContext } from 'react'


const Leftbar = () => {

  const {currentUser } = useContext(AuthContext);



  return (
    <div className='leftbar'>
      <div className="container">
        <div className="menu">
          <div className="user">

        <img src={currentUser.profilePic} alt="" />
       <span>{currentUser.name}</span>
          
          
          </div>
          <div className="item">
            <img src={Friends} alt="" style={{cursor: "pointer"}}/>
            <span style={{cursor: "pointer"}}>Friends</span>
          </div>
          <div className="item" >
            <img src={Group} alt="" style={{cursor: "pointer"}} />
            <span style={{cursor: "pointer"}}>Groups</span>
          </div>
          <div className="item">
            <img src={Message} alt="" style={{cursor: "pointer"}}/>
            <span style={{cursor: "pointer"}}>Message</span>
          </div>
          <div className="item">
            <img src={Market} alt="" style={{cursor: "pointer"}}/>
            <span style={{cursor: "pointer"}}>Market</span>
          </div>
          <div className="item">
            <img src={Gallery} alt="" style={{cursor: "pointer"}}/>
            <span style={{cursor: "pointer"}}>Gallery</span>
          </div>
          <div className="item">
            <img src={Videos} alt="" style={{cursor: "pointer"}}/>
            <span style={{cursor: "pointer"}}>Video</span>
          </div>
          <div className="item">
            <img src={Gaming} alt="" style={{cursor: "pointer"}} />
            <span style={{cursor: "pointer"}}>Gaming</span>
          </div>
          <div className="item">
            <img src={Watch} alt="" style={{cursor: "pointer"}}/>
            <span style={{cursor: "pointer"}}>Watch</span>
          </div>
          <div className="item">
            <img src={Fund} alt="" style={{cursor: "pointer"}}/>
            <span style={{cursor: "pointer"}}>Fund</span>
          </div>
        </div>
        <hr/>
        <div className="menu">
          <span style={{cursor: "pointer"}}>Your shorcut</span>
          <div className="item">
            <img src={Gallery} alt="" style={{cursor: "pointer"}}/>
            <span style={{cursor: "pointer"}}>Gallery</span>
          </div>
          <div className="item">
            <img src={Videos} alt="" style={{cursor: "pointer"}}/>
            <span style={{cursor: "pointer"}}>Video</span>
          </div>
          <div className="item">
            <img src={Gaming} alt="" style={{cursor: "pointer"}}/>
            <span style={{cursor: "pointer"}}>Gaming</span>
          </div>
          <div className="item">
            <img src={Watch} alt="" style={{cursor: "pointer"}}/>
            <span style={{cursor: "pointer"}}>Watch</span>
          </div>
          </div>
          <hr/>
          <div className="menu">
            <span style={{cursor: "pointer"}}>Others</span>
            <div className="item">
            <img src={Watch} alt="" style={{cursor: "pointer"}}/>
            <span style={{cursor: "pointer"}}>Watch</span>
          </div>
          <div className="item">
            <img src={Fund} alt="" style={{cursor: "pointer"}}/>
            <span style={{cursor: "pointer"}}>Fund</span>
          </div>
          </div>
      </div>
    </div>
  )
}

export default Leftbar
