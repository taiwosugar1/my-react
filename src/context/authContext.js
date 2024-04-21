import { createContext, useEffect, useState } from "react";


export  const AuthContext = createContext();

export const  AuthContextProvider = ({children}) =>{
    const [currentUser, setCurrentUser] = useState(
       JSON.parse(localStorage.getItem("User")) || true
    );

        const login = async ()=>{
        setCurrentUser({
            id: 1,
             name:"oguntoyinbo taiwo",

             profilePic:
             "https://images.pexels.com/photos/2216607/pexels-photo-2216607.jpeg?auto=compress&cs=tinysrgb&w=600"
    })};

    useEffect(()=>{
        localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser]);

    return(
        <AuthContext.Provider value={{ currentUser, login }}>
            {children}
            </AuthContext.Provider>
    );
};