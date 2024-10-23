import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import { getDoc, doc, updateDoc, arrayRemove, arrayUnion, setDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import './FriendList.css';
import Chat from './Chat';

const FriendList = () => {
  const [friends, setFriends] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [friendRequestDetails, setFriendRequestDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [isVideoCall, setIsVideoCall] = useState(false);

  const auth = getAuth();
  const currentUserId = auth.currentUser?.uid;
  const currentUser = { uid: currentUserId, name: auth.currentUser?.displayName };
  
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnectionRef = useRef(null);
  const localStreamRef = useRef(null);

  useEffect(() => {
    const fetchFriendsAndRequests = async () => {
      if (!currentUserId) return;

      try {
        const userDocRef = doc(db, 'users', currentUserId);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setFriendRequests(userData.friendRequests || []);

          const friendsData = await Promise.all(
            userData.friends.map(async (friendId) => {
              const friendDoc = await getDoc(doc(db, 'users', friendId));
              return { id: friendId, ...friendDoc.data() };
            })
          );

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

  useEffect(() => {
    const fetchFriendRequestDetails = async () => {
      const requestDetails = {};

      for (const requestId of friendRequests) {
        const userDocRef = doc(db, 'users', requestId);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          requestDetails[requestId] = userDoc.data().name;
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
        friends: arrayUnion(requestId),
      });

      setFriendRequests((prevRequests) =>
        prevRequests.filter((req) => req !== requestId)
      );

      const friendDoc = await getDoc(doc(db, 'users', requestId));
      if (friendDoc.exists()) {
        setFriends((prevFriends) => [
          ...prevFriends,
          { id: requestId, ...friendDoc.data() },
        ]);
      }
    } catch (error) {
      console.error('Error accepting friend request:', error);
    }
  };

  const handleDeclineRequest = async (requestId) => {
    try {
      const userDocRef = doc(db, 'users', currentUserId);
      await updateDoc(userDocRef, {
        friendRequests: arrayRemove(requestId),
      });

      setFriendRequests((prevRequests) =>
        prevRequests.filter((req) => req !== requestId)
      );
    } catch (error) {
      console.error('Error declining friend request:', error);
    }
  };

  const handleSelectFriend = (friend) => {
    setSelectedFriend(friend);
    initiateVideoCall();
  };

  const initiateVideoCall = async () => {
    setIsVideoCall(true);

    try {
      const localStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      localStreamRef.current = localStream;

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = localStream;
      }

      const peerConnection = new RTCPeerConnection();
      peerConnectionRef.current = peerConnection;

      // Add local stream tracks to the peer connection
      localStream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, localStream);
      });

      // Set up event to handle receiving remote stream
      peerConnection.ontrack = (event) => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = event.streams[0];
        }
      };

      // Exchange offer/answer and ICE candidates with signaling (using Firebase here)
      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);

      // Save offer to Firebase (for signaling)
      const offerDocRef = doc(db, 'calls', currentUserId);
      await setDoc(offerDocRef, { offer: offer });

      // Listen for answer from the friend (you need to implement the signaling logic here)
      // You can listen to Firestore document changes for the answer.

    } catch (error) {
      console.error('Error starting video call:', error);
    }
  };

  const endCall = () => {
    setIsVideoCall(false);
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
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
              <button onClick={() => handleSelectFriend(friend)}>Video Call</button>
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
                <span>{friendRequestDetails[requestId] || 'Loading...'}</span>
                <button onClick={() => handleAcceptRequest(requestId)}>
                  Accept
                </button>
                <button onClick={() => handleDeclineRequest(requestId)}>
                  Decline
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {selectedFriend && isVideoCall && (
        <div className="video-call-container">
          <h3>Video Call with {selectedFriend.name}</h3>
          <div className="video-wrapper">
            <video ref={localVideoRef} autoPlay playsInline muted />
            <video ref={remoteVideoRef} autoPlay playsInline />
          </div>
          <button onClick={endCall}>End Call</button>
        </div>
      )}
    </div>
  );
};

export default FriendList;
