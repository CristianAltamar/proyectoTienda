export const useAuth = () => {
    const token = localStorage.getItem("token");
    if (token) {
        const decodedToken = atob(token.split(".")[1]);
        const payload = JSON.parse(decodedToken);
    }
}