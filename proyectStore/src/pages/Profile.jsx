import { ProfileInfo } from "../components/profile/ProfileInfo.jsx";
import { NavProfile } from "../components/profile/NavProfile.jsx";
import { useContext, useEffect } from "react";
import { ProfileContext } from "../contexts/contexProfile.jsx";

export const Profile = () => {
    const { profileData } = useContext(ProfileContext)

    useEffect(() => {
        const token = localStorage.getItem("token")
        if(!token) window.location.replace("/login");
    })

    return (
        <div className="w-full flex flex-col items-center p-8 pt-14 relative">
            <NavProfile />
            <ProfileInfo profileData={profileData} />
        </div>
    )
}