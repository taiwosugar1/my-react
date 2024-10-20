import { Link, useNavigate } from 'react-router-dom';
import './Register.css';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../firebase'; // Ensure Firebase is properly configured
import { setDoc, doc } from 'firebase/firestore'; // Firestore functions

const Register = () => {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save user data to Firestore
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        username,
        name,
        email,
        profilePic: '', // Placeholder for profile picture
        coverPhoto: '', // Placeholder for cover photo
        facebook: '',   // Add more fields as needed
        instagram: '',
        pinterest: '',
        linkedin: '',
        x: '',
        location: '',
        website: '',
        createdAt: new Date(),
      });

      alert('Registration successful!');
      navigate('/');
    } catch (error) {
      console.error('Registration error:', error);
      alert('Error registering: ' + error.message);
    }
  };

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Multi<br />brand</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          <span>Already have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
