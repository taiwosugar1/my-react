import React, { useEffect, useRef, useState } from 'react';
import { collection, query, where, onSnapshot, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';
import './Chat.css';

const Chat = ({ currentUser, friend }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef(null); // Ref to track the end of the message list

    // Fetch messages between the current user and their friend
    useEffect(() => {
        const fetchMessages = () => {
            const messagesRef = collection(db, 'messages');
            const q = query(
                messagesRef,
                where('participants', 'array-contains-any', [currentUser.uid, friend.uid])
            );

            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const fetchedMessages = [];
                querySnapshot.forEach((doc) => {
                    fetchedMessages.push({ id: doc.id, ...doc.data() });
                });
                setMessages(fetchedMessages);
            });

            return () => unsubscribe();
        };

        if (friend) { // Only fetch messages if a friend is selected
            fetchMessages();
        }
    }, [currentUser.uid, friend]);

    // Auto-scroll to the bottom of the messages whenever new messages are added
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    // Handle sending a new message
    const sendMessage = async (e) => {
        e.preventDefault();
        if (newMessage.trim() === '') return;

        await addDoc(collection(db, 'messages'), {
            text: newMessage,
            sender: currentUser.uid,
            recipient: friend.uid,
            participants: [currentUser.uid, friend.uid],
            timestamp: Timestamp.fromDate(new Date()),
        });

        setNewMessage('');
    };

    return (
        <div className="chat-container">
            <h2>Chat with {friend?.name}</h2>
            <div className="messages">
                {messages.map((msg) => (
                    <div key={msg.id} className={`message ${msg.sender === currentUser.uid ? 'sent' : 'received'}`}>
                        <p>{msg.text}</p>
                        <span className='chat-date'>{new Date(msg.timestamp.toDate()).toLocaleTimeString()}</span>
                    </div>
                ))}
                {/* This div will be used as the auto-scroll target */}
                <div ref={messagesEndRef} />
            </div>
            <form onSubmit={sendMessage} className="chat-form">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default Chat;