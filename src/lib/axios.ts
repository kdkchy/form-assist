import Axios from 'axios';
import { store } from '@/store'
import { clearAuth } from '@/store/auth/authSlice';

const api = Axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api`,
});

api.interceptors.request.use(
    (config) => {
        const token = store.getState().auth.token
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response.status === 401) {
            store.dispatch(clearAuth())
            window.location.href = '/auth/login';
        }
        return Promise.reject(error);
    }
);

export { api };
