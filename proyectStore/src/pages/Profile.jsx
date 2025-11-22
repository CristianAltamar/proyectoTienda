import { useEffect, useState, useRef } from "react"
import { useFetch } from "../hooks/useFetch.jsx";
import { endpoints } from "../api/enpoints.js";
import { ProfileInfo } from "../components/profile/ProfileInfo.jsx";
import { NavProfile } from "../components/profile/NavProfile.jsx";

export const Profile = () => {
    const [profileData, setProfileData] = useState({});
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
        window.location.replace("/login")
    }, []);

    

    return (
        <div className="w-full flex flex-col items-center p-8 pt-14 relative">
            <NavProfile />
            <ProfileInfo profileData={profileData} />
        </div>
    )
}