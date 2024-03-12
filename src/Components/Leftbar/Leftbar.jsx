import React, { useContext } from 'react'
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

const Leftbar = () => {

  const {currentUser}=useContext(AuthContext);

  return (
    <div className='leftbar'>
      <div className="container">
        <div className="menu">
          <div className="user">

        <img src={currentUser.profilePic} alt="" />
       <span>currentUser.name</span>
          
          
          </div>
          <div className="item">
            <img src={Friends} alt="" />
            <span>Friends</span>
          </div>
          <div className="item">
            <img src={Group} alt="" />
            <span>Groups</span>
          </div>
          <div className="item">
            <img src={Message} alt="" />
            <span>Message</span>
          </div>
          <div className="item">
            <img src={Market} alt="" />
            <span>Market</span>
          </div>
          <div className="item">
            <img src={Gallery} alt="" />
            <span>Gallery</span>
          </div>
          <div className="item">
            <img src={Videos} alt="" />
            <span>Video</span>
          </div>
          <div className="item">
            <img src={Gaming} alt="" />
            <span>Gaming</span>
          </div>
          <div className="item">
            <img src={Watch} alt="" />
            <span>Watch</span>
          </div>
          <div className="item">
            <img src={Fund} alt="" />
            <span>Fund</span>
          </div>
        </div>
        <hr/>
        <div className="menu">
          <span>Your shorcut</span>
          <div className="item">
            <img src={Gallery} alt="" />
            <span>Gallery</span>
          </div>
          <div className="item">
            <img src={Videos} alt="" />
            <span>Video</span>
          </div>
          <div className="item">
            <img src={Gaming} alt="" />
            <span>Gaming</span>
          </div>
          <div className="item">
            <img src={Watch} alt="" />
            <span>Watch</span>
          </div>
          </div>
          <hr/>
          <div className="menu">
            <span>Others</span>
            <div className="item">
            <img src={Watch} alt="" />
            <span>Watch</span>
          </div>
          <div className="item">
            <img src={Fund} alt="" />
            <span>Fund</span>
          </div>
          </div>
      </div>
    </div>
  )
}

export default Leftbar
