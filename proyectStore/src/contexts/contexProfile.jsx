import { createContext, useState, useEffect } from "react";
import { useFetch } from "../hooks/useFetch.jsx";
import { endpoints } from "../api/enpoints.js";

export const ProfileContext = createContext();

export const ProfileProviden = ({ children }) => {
    const [profileData, setProfileData] = useState({})
    
    const getProfileData = () => {
        const token = localStorage.getItem("token")
        if (token) {
            const user = JSON.parse(atob(token.split(".")[1]));
            const fetchProfile = async () => {
                const data = await useFetch(endpoints.getUsers(user.sub), "GET", null, false);
                setProfileData(data);
            }
            fetchProfile();
            return
        }
        setProfileData({})
    }
    
    useEffect(() => {
        getProfileData()
    }, []);

    return(
        <ProfileContext.Provider value={{ profileData, setProfileData, getProfileData }} >
            {children}
        </ProfileContext.Provider>
    )
}