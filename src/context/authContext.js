import { createContext, useEffect, useState } from "react";
import { json } from "react-router-dom";

export  const AuthContext = createContext();

export const  AuthContextProvider =({children}) =>{
    const [currentUsser, setCurrentUser] = useState(
       JSON.parse(localStorage.getItem("User")) || null
    );


    const login = ()=>{
        //TO DO
        setCurrentUser({
            id:1,
            name:"Oguntoyinbo Taiwo",
         profilePic:"https://images.pexels.com/photos/1519088/pexels-photo-1519088.jpeg?auto=compress&cs=tinysrgb&w=600"
        });
    };

    useEffect(()=>{
        localStorage.setItem("User", JSON.stringify(currentUsser));
    },[currentUsser]);

    return(
        <AuthContext.Provider value={{ currentUsser, login }}>
            {children}
            </AuthContext.Provider>
    );
};