import { endpoints } from "../api/enpoints.js";
import { useFetch } from "../hooks/useFetch.jsx";

export const validation = async (user, password) => {
    const response = await useFetch(endpoints.login(), "POST", { "username": user, "password": password }, true);
    if (response.token) {
        localStorage.setItem("token", response.token);
        return true;
    }
    return false;
}