import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import './App.css';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Navbar from './Components/Navbar/Navbar';
import Leftbar from './Components/Leftbar/Leftbar';
import Rightbar from './Components/Rightbar/Rightbar';
import './Style.css';
import { useContext } from 'react';
import { DarkModeContext } from './context/DarkModeContext';
import { AuthContext } from './context/authContext';
import Home from './Pages/Home/Home';
import Profile from './Pages/Profile/Profile';
import FriendList from './Components/FriendList';
import EditProfile from './Pages/Profile/EditProfile';

function App() {
  const { currentUser } = useContext(AuthContext);
  const { darkMode } = useContext(DarkModeContext);

  const Layout = () => (
    <div className={`main theme-${darkMode ? "dark" : "light"}`}>
      <div className='nav'>
        <Navbar />
      </div>
      
      <div className='layout-container'>
        <div className='leftbar-container'>
          <Leftbar />
        </div>
  
        <div className='content-container'>
          <Outlet />
        </div>
  
        <div className='rightbar-container'>
          <Rightbar />
        </div>
      </div>
    </div>
  );

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "home",
          element: currentUser ? <Home /> : <Login />, // Redirect to Login if not logged in
        },
        {
          path: "profile/:userId",
          element: currentUser ? <Profile /> : <Login />, // Redirect to Login if not logged in
        },
        {
          path: "friends",
          element: currentUser ? <FriendList /> : <Login />, // Redirect to Login if not logged in
        },
        {
          path: "edit-profile/:userId",
          element: currentUser ? <EditProfile /> : <Login />, // Redirect to Login if not logged in
        },
      ],
    },
    {
      path: "/login",
      element: !currentUser ? <Login /> : <Home />, // Redirect to Home if logged in
    },
    {
      path: "/register",
      element: !currentUser ? <Register /> : <Home />, // Redirect to Home if logged in
    },
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
