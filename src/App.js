import { useContext } from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import './App.css';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Navbar from './Components/Navbar/Navbar'
import Leftbar from './Components/Leftbar/Leftbar';
import Rightbar from './Components/Rightbar/Rightbar';

import './Style.scss'
import { DarkModeContext } from './context/DarkModeContext';

import Home from './Pages/Home/Home';

 import Profile from './Pages/Profile/Profile';



function App() {

  const {darkMode}=useContext(DarkModeContext);
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

  const router = createBrowserRouter([
    {
      path: "/",
      element:<Layout/>,
      children:[{
        path:"/",
        element: <Home/>
      },
      {
        path:"/Profile:id",
        element: <Profile/>
      },
 
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
