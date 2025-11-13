import { endpoints } from "../api/enpoints.js";
import { useFetch } from "../hooks/useFetch.jsx";

export const validation = (user, password) => {
    const login = async () => {
            const response = await useFetch(endpoints.login(), "POST", { "username": user, "password": password }, true);
            console.log(response);
    };
    login();
}