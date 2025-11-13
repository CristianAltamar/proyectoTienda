export const useFetch = async (endpoint, method = 'GET' , body = null, login = false) => {
    if (!endpoint) return null;

    if (method === 'GET' || method === 'DELETE') {
        try {
            const response = await fetch(endpoint, {method});
            if (!response.ok) throw new Error('Network response was not ok');
            return await response.json();
        } catch (error) {
            console.error('Fetch error:', error);
            return null;
        }
    } else {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        };

        const options = {
            method,
            headers
        };

        if (body) {
            console.log("body", body);
            options.body = JSON.stringify(body);
        }

        try {
            const response = await fetch(endpoint, options);
            if (!response.ok) throw new Error('Network response was not ok');
            if (login) {
                const data = await response.json();
                localStorage.setItem('token', data.token);
                return data;
            }
            return await response.json();
        } catch (error) {
            console.error('Fetch error:', error);
            return null;
        }
    }
};