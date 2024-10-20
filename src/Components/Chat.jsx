import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, query, where, onSnapshot, addDoc, orderBy, getDoc, doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import './Chat.css';

const Chat = ({ friendId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [friendName, setFriendName] = useState('');
  const auth = getAuth();
  const currentUserId = auth.currentUser?.uid; // Get the current user's ID

  useEffect(() => {
    const fetchFriendName = async () => {
      const friendDoc = await getDoc(doc(db, 'users', friendId));
      if (friendDoc.exists()) {
        setFriendName(friendDoc.data().name);
      } else {
        console.error('Friend not found!');
      }
    };

    fetchFriendName();
  }, [friendId]);

  useEffect(() => {
    if (!currentUserId) {
      console.error('No current user ID found');
      return; // Don't run the query if there's no user
    }

    const chatQuery = query(
      collection(db, 'chats'),
      where('participants', 'array-contains', currentUserId),
      orderBy('timestamp') // Order messages by timestamp
    );

    const unsubscribe = onSnapshot(chatQuery, (querySnapshot) => {
      const chats = [];
      querySnapshot.forEach((doc) => {
        chats.push({ id: doc.id, ...doc.data() });
        console.log('Retrieved chat document:', doc.id, '=>', doc.data()); // Log each chat document
      });
      console.log('All chats retrieved:', chats); // Log all retrieved chats
      setMessages(chats);
    }, (error) => {
      console.error('Error fetching chats:', error);
    });

    return () => unsubscribe();
  }, [currentUserId]);

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      const chatRef = collection(db, 'chats');
      await addDoc(chatRef, {
        participants: [currentUserId, friendId],
        messages: [
          {
            senderId: currentUserId,
            receiverId: friendId,
            message: newMessage,
            timestamp: new Date(),
          },
        ],
        timestamp: new Date(), // Add a timestamp to the chat document
      });
      setNewMessage('');
    }
  };

  return (
    <div className="chat-container">
      <h2>Chat with {friendName}</h2>
      <div className="messages">
        {messages.map((chat) => (
          <div key={chat.id}>
            {chat.messages.map((msg, index) => (
              <div key={index} className={msg.senderId === currentUserId ? 'message sent' : 'message received'}>
                <p>{msg.message}</p>
                <span>{new Date(msg.timestamp).toLocaleTimeString()}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="message-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
