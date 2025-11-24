import { createContext, useState, useEffect, useRef } from "react";
import { useFetch } from "../hooks/useFetch.jsx";
import { endpoints } from "../api/enpoints.js";

export const ProfileContext = createContext();

export const ProfileProviden = ({ children }) => {
    const [profileData, setProfileData] = useState({})
    const token = useRef(localStorage.getItem("token"))
    
    useEffect(() => {
        if (token.current) {
            const user = JSON.parse(atob(token.current.split(".")[1]));
            const fetchProfile = async () => {
                const data = await useFetch(endpoints.getUsers(user.sub), "GET", null, false);
                setProfileData(data);
            }
            fetchProfile();
            return
        }
        setProfileData({})
    }, []);

    return(
        <ProfileContext.Provider value={{ profileData, setProfileData }} >
            {children}
        </ProfileContext.Provider>
    )
}