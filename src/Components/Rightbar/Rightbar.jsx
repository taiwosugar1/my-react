import React, { useState, useEffect } from 'react';
import { collection, getDocs, updateDoc, arrayUnion, arrayRemove, doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { getAuth } from 'firebase/auth'; // Import Firebase Authentication
import './Rightbar.css';
import { Link } from 'react-router-dom';

const Rightbar = () => {
  const [registeredUsers, setRegisteredUsers] = useState([]); // Fetch all registered users
  const [currentUser, setCurrentUser] = useState(null); // Store the current logged-in user
  const [friendRequests, setFriendRequests] = useState([]); // Store received friend requests
  const [friends, setFriends] = useState([]); // Store the user's accepted friends
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track user's login status

  useEffect(() => {
    const auth = getAuth(); // Initialize Firebase Auth
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
      setCurrentUser(user); // Set current user
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  useEffect(() => {
    if (isLoggedIn && currentUser) {
      const fetchRegisteredUsers = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, 'users'));
          const users = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setRegisteredUsers(users);
        } catch (error) {
          console.error('Error fetching registered users:', error);
        }
      };

      // Fetch the current user's friend requests and friends list
      const fetchUserDetails = async () => {
        if (currentUser) {
          const userDocRef = doc(db, 'users', currentUser.uid); // Reference to the current user's document
          const userDoc = await getDoc(userDocRef); // Use getDoc to fetch the single document

          if (userDoc.exists()) {
            const userData = userDoc.data();
            setFriendRequests(userData.friendRequests || []); // Get friendRequests from the user's document
            setFriends(userData.friends || []); // Get friends from the user's document
          } else {
            console.log("No such document!"); // Handle case where document does not exist
          }
        }
      };

      fetchRegisteredUsers();
      fetchUserDetails();
    }
  }, [isLoggedIn, currentUser]); // Fetch users when logged in status or current user changes

  // Function to send a friend request
  const handleSendFriendRequest = async (userId) => {
    try {
      const userDocRef = doc(db, 'users', userId);
      await updateDoc(userDocRef, {
        friendRequests: arrayUnion(currentUser.uid), // Add current user's ID to the target user's friendRequests
      });
      setFriendRequests((prevRequests) => [...prevRequests, userId]); // Update state with new request
      alert('Friend request sent!'); // Alert message
    } catch (error) {
      console.error('Error sending friend request:', error);
    }
  };

  // Function to delete a friend request
  const handleDeleteFriendRequest = async (userId) => {
    try {
      const userDocRef = doc(db, 'users', userId);
      await updateDoc(userDocRef, {
        friendRequests: arrayRemove(currentUser.uid), // Remove current user's ID from the target user's friendRequests
      });
      setFriendRequests(friendRequests.filter((id) => id !== userId)); // Update state
      alert('Friend request deleted.'); // Alert message
    } catch (error) {
      console.error('Error deleting friend request:', error);
    }
  };

  // Function to accept a friend request
  const handleAcceptFriendRequest = async (userId) => {
    try {
      const currentUserDocRef = doc(db, 'users', currentUser.uid);
      const otherUserDocRef = doc(db, 'users', userId);

      // Add each other to the friends list
      await updateDoc(currentUserDocRef, {
        friends: arrayUnion(userId), // Add the other user to the current user's friends list
        friendRequests: arrayRemove(userId) // Remove the friend request from the current user
      });

      await updateDoc(otherUserDocRef, {
        friends: arrayUnion(currentUser.uid) // Add the current user to the other user's friends list
      });

      // Update state to reflect accepted friend
      setFriends((prevFriends) => [...prevFriends, userId]);
      setFriendRequests(friendRequests.filter((id) => id !== userId));

      alert('Friend request accepted!'); // Alert message
    } catch (error) {
      console.error('Error accepting friend request:', error);
    }
  };

  return (
    <div className="rightbar">
      <div className="container">
        <div className="item">
          <span>Suggestions For You</span>
          {isLoggedIn ? (
            registeredUsers
              .filter(user => user.id !== currentUser.uid) // Filter out the current user
              .map((user) => (
                
                <div className="user" key={user.id}>
                  <Link to={`/profile/${user.id}`}>
                  <div className="userinfo">
                    <img src={user.profilePic} alt={user.name} />
                    <span>{user.name}</span>
                  </div>
                  </Link>
                 
                  {friends.includes(user.id) ? (
                    <button disabled>Friends</button> // Display "Friends" if already accepted
                  ) : friendRequests.includes(user.id) ? (
                    <>
                      <button onClick={() => handleAcceptFriendRequest(user.id)}>
                        Accept Request
                      </button>
                      <button onClick={() => handleDeleteFriendRequest(user.id)}>
                        Delete Request
                      </button>
                    </>
                  ) : (
                    <button onClick={() => handleSendFriendRequest(user.id)}>
                      Send Friend Request
                    </button>
                  )}
                </div>
              ))
          ) : (
            <span>Please log in to see user suggestions.</span> // Message for logged out users
          )}
        </div>
      </div>
    </div>
  );
};

export default Rightbar;
