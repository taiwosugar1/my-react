import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import { getDoc, doc, updateDoc, arrayRemove, arrayUnion } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import './FriendList.css'; 
import Chat from './Chat';

const FriendList = () => {
  const [friends, setFriends] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [friendRequestDetails, setFriendRequestDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedFriendId, setSelectedFriendId] = useState(null); // Track the selected friend
  const auth = getAuth();
  const currentUserId = auth.currentUser?.uid; // Get the current user's ID

  useEffect(() => {
    const fetchFriendsAndRequests = async () => {
      if (!currentUserId) return; // Exit if there's no current user ID

      try {
        const userDocRef = doc(db, 'users', currentUserId);
        const userDoc = await getDoc(userDocRef);
        
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setFriendRequests(userData.friendRequests || []); // Get friendRequests from user's data

          // Fetch friends' data
          const friendsData = await Promise.all(userData.friends.map(async (friendId) => {
            const friendDoc = await getDoc(doc(db, 'users', friendId));
            return { id: friendId, ...friendDoc.data() };
          }));

          setFriends(friendsData);
        } else {
          console.log("User document does not exist!");
        }
      } catch (error) {
        console.error('Error fetching friends or friend requests:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFriendsAndRequests();
  }, [currentUserId]);

  // Fetch friend request user details
  useEffect(() => {
    const fetchFriendRequestDetails = async () => {
      const requestDetails = {};

      for (const requestId of friendRequests) {
        const userDocRef = doc(db, 'users', requestId);
        const userDoc = await getDoc(userDocRef);
        
        if (userDoc.exists()) {
          requestDetails[requestId] = userDoc.data().name; // Store the friend's name
        }
      }

      setFriendRequestDetails(requestDetails);
    };

    if (friendRequests.length > 0) {
      fetchFriendRequestDetails();
    }
  }, [friendRequests]);

  const handleAcceptRequest = async (requestId) => {
    try {
      const userDocRef = doc(db, 'users', currentUserId);
      await updateDoc(userDocRef, {
        friendRequests: arrayRemove(requestId),
        friends: arrayUnion(requestId) // Add the new friend to the friends list
      });

      setFriendRequests((prevRequests) => {
        const updatedRequests = prevRequests.filter((req) => req !== requestId);
        return updatedRequests;
      });
      
      // Optionally, fetch the friend data if needed
      const friendDoc = await getDoc(doc(db, 'users', requestId));
      if (friendDoc.exists()) {
        setFriends((prevFriends) => [...prevFriends, { id: requestId, ...friendDoc.data() }]); // Add to friends list
      }
    } catch (error) {
      console.error('Error accepting friend request:', error);
    }
  };

  const handleDeclineRequest = async (requestId) => {
    try {
      const userDocRef = doc(db, 'users', currentUserId);
      await updateDoc(userDocRef, {
        friendRequests: arrayRemove(requestId), // Remove the request from the friend requests
      });

      setFriendRequests((prevRequests) => prevRequests.filter((req) => req !== requestId));
    } catch (error) {
      console.error('Error declining friend request:', error);
    }
  };

  if (loading) {
    return <div>Loading friends list...</div>;
  }

  return (
    <div className="friends-list">
      <h2>Your Friends</h2>
      {friends.length === 0 ? (
        <p>No friends found.</p>
      ) : (
        <ul>
          {friends.map((friend) => (
            <li key={friend.id} className="friend-item">
              <Link to={`/profile/${friend.id}`}>
                <img
                  src={friend.profilePic || 'default-profile-pic-url'}
                  alt={`${friend.name}'s profile`}
                  className="friend-profile-pic"
                />
                <span className="friend-name">{friend.name}</span>
              </Link>
              <button onClick={() => setSelectedFriendId(friend.id)}>Chat</button> {/* Chat button */}
            </li>
          ))}
        </ul>
      )}

      <div className="friend-requests">
        <h3>Friend Requests</h3>
        {friendRequests.length === 0 ? (
          <p>No friend requests at the moment.</p>
        ) : (
          <ul>
            {friendRequests.map((requestId) => (
              <li key={requestId} className="request-item">
                <span>{friendRequestDetails[requestId] || 'Loading...'}</span> {/* Display friend's name */}
                <button onClick={() => handleAcceptRequest(requestId)}>Accept</button>
                <button onClick={() => handleDeclineRequest(requestId)}>Decline</button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {selectedFriendId && <Chat friendId={selectedFriendId} />} {/* Render chat when a friend is selected */}
    </div>
  );
};

export default FriendList;
