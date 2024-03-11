import { Component, useContext } from 'react';
import ReactDOM from "react-dom";
import { createBrowserRouter, RouterProvider, Route, Navigate, Outlet, } from 'react-router-dom';
import './App.css';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Navbar from './Components/Navbar/Navbar'
import Leftbar from './Components/Leftbar/Leftbar';
import Rightbar from './Components/Rightbar/Rightbar';
import Profile from './Pages/Profile/Profile';
import Home from './Pages/Home/Home';
import './Style.scss'
import { DarkModeContext } from './context/DarkModeContext';
import { AuthContext } from './context/authContext';

function App() {

  const {currentUser} = useContext(AuthContext);

  const {darkMode}=useContext(DarkModeContext)
  console.log(darkMode)

const Layout = () =>{
  return(
    <div className={`theme-${darkMode ? "dark" : "light"}`}>
      <Navbar/>
      <div style={{display: "flex"}}>
        <Leftbar/>

        <div style={{flex: 6}}>
        <Outlet/>
        </div>

        <Rightbar/>
      </div>
    </div>
  )
};

 const ProtectedRoute = ({children}) =>{
  if(!currentUser){
      return <Navigate to = "/login" />;
  }
  return children;
}

  const router = createBrowserRouter([
    {
     path: "/",
     element:(  
      <ProtectedRoute>
        <Layout/>
      </ProtectedRoute>
     ),
     children:[
      {
      path: "/",
      element: <Home/>
     },
     {
      path: "/profile/:id",
      element: <Profile/>
     }
    ]
    },
    {
      path: "/login",
      element: <Login/>,
    },
    {
      path: "/register",
      element: <Register/>,
    },
  ]);


  return (
    <div>
         <RouterProvider router={router} />

  
    </div>
  );
}

export default App;
