import axios from 'axios';

// Create an instance of Axios with custom configuration
const api = axios.create({
    baseURL: 'http://localhost:8080/api', // Replace with your API base URL
});

// Handle error responses globally
api.interceptors.response.use(
    response => response.data,
    error => {
        console.error('API error:', error.response);
        return Promise.reject(error);
    }
);

export default api;
