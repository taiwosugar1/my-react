import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import './App.css';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Navbar from './Components/Navbar/Navbar';
import Leftbar from './Components/Leftbar/Leftbar';
import Rightbar from './Components/Rightbar/Rightbar';
import { useContext } from 'react';
import { AuthContext } from './context/authContext';
import Home from './Pages/Home/Home';
import Profile from './Pages/Profile/Profile';
import FriendList from './Components/FriendList';
import EditProfile from './Pages/Profile/EditProfile';
import Chat from './Components/Chat';
import Footer from './Components/Navbar/Footer';


function App() {
  const { currentUser } = useContext(AuthContext);

  const Layout = () => (
    <div className={`main`}>
        <Navbar />
      
      <div className='layout-container'>
        <div className='leftbar-container'>
          <Leftbar />
        </div>
  
        <div className='content-container'>
          <Outlet /> {/* This will need to be replaced in the Routes below */}
        </div>
  
        <div className='rightbar-container'>
          <Rightbar />
        </div>
      </div>
      <Footer />
    </div>
  );

  return (
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="home" element={currentUser ? <Home /> : <Login />} />
            <Route path="profile/:userId" element={currentUser ? <Profile /> : <Login />} />
            <Route path="friends" element={currentUser ? <FriendList /> : <Login />} />
            <Route path="edit-profile/:userId" element={currentUser ? <EditProfile /> : <Login />} />
            <Route path="chat/:userId" element={currentUser ? <Chat /> : <Login />} />
            
          </Route>
          <Route path="/login" element={!currentUser ? <Login /> : <Home />} />
          <Route path="/register" element={!currentUser ? <Register /> : <Home />} />
        </Routes>
      </Router>
  );
}

export default App;
