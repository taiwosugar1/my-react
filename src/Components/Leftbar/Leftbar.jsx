import './Leftbar.css';
import Friends from '../../Asset/friends.png';
import Group from '../../Asset/group.png';
import Message from '../../Asset/message.jpg';
import Market from '../../Asset/market.png';
import Gallery from '../../Asset/gallery.jpg';
import Videos from '../../Asset/videos.jpg';
import Gaming from '../../Asset/gaming.jpg';
import Watch from '../../Asset/watch.jpg';
import Fund from '../../Asset/fund.jpg';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/authContext';
import { auth, db } from '../../firebase'; // Firebase import

// Reusable MenuItem component
const MenuItem = ({ imgSrc, label }) => {
  return (
    <div className="item">
      <img src={imgSrc} alt={label} className="clickable" />
      <span className="clickable">{label}</span>
    </div>
  );
};

const Leftbar = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  // Fetch user data from Firebase when the component mounts
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
              profilePic: userDoc.data().profilePic || 'default-profile-pic-url', // Default pic if not available
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

  if (loading) {
    return <div>Loading...</div>; // Optionally display a loading state
  }

  return (
    <div className='leftbar'>
      <div className="container">
        <div className="menu">
          {/* Display the current user information from Firebase */}
          <div className="user">
            {currentUser ? (
              <>
                <img
                  src={currentUser.profilePic || 'default-profile-pic-url'}
                  alt={`${currentUser.name}'s profile`}
                />
                <span>{currentUser.name}</span>
              </>
            ) : (
              <span>Loading user...</span>
            )}
          </div>

          {/* Menu items */}
          <MenuItem imgSrc={Friends} label="Friends" />
          <MenuItem imgSrc={Group} label="Groups" />
          <MenuItem imgSrc={Message} label="Message" />
          <MenuItem imgSrc={Market} label="Market" />
          <MenuItem imgSrc={Gallery} label="Gallery" />
          <MenuItem imgSrc={Videos} label="Video" />
          <MenuItem imgSrc={Gaming} label="Gaming" />
          <MenuItem imgSrc={Watch} label="Watch" />
          <MenuItem imgSrc={Fund} label="Fund" />
        </div>

        <hr />

        <div className="menu">
          <span className="clickable">Your shortcuts</span>
          <MenuItem imgSrc={Gallery} label="Gallery" />
          <MenuItem imgSrc={Videos} label="Video" />
          <MenuItem imgSrc={Gaming} label="Gaming" />
          <MenuItem imgSrc={Watch} label="Watch" />
        </div>

        <hr />

        <div className="menu">
          <span className="clickable">Others</span>
          <MenuItem imgSrc={Watch} label="Watch" />
          <MenuItem imgSrc={Fund} label="Fund" />
        </div>
      </div>
    </div>
  );
};

export default Leftbar;
