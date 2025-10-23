export const useNavigate = () => {
    const navigate = (path) => {
        window.history.pushState({}, '', path);
        const navEvent = new PopStateEvent('popstate');
        window.dispatchEvent(navEvent);
    };

    return navigate;
};