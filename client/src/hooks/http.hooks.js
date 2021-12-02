import { useCallback, useState } from 'react';

const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        setLoading(true);
        if (body) {
            body = JSON.stringify(body);
            headers['Content-type'] = 'application/json';
        }
        try {
            const response = await fetch(url, { method, body, headers });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'что-то пошло не так');
            }
            setLoading(false);
            return data;
        } catch (error) {
            setLoading(false);
            setError(error.message);
            throw error;
        }
    }, []);

    const clearError = useCallback(() => setError(null), []);

    return { loading, request, error, clearError };
};

export default useHttp;
