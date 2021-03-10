import axios from 'axios';

const Axios = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,
    timeout: 1000, // indicates, 1000ms ie. 1 second
    headers: {
        "Content-Type": "application/json"
    }
});

// interceptor to catch errors
const errorInterceptor = error => {
    // all the error responses
    switch(error.response.status) {
        case 400:
            console.error(error.response.status, error.message);
            break;
        default:
            console.error(error.response.status, error.message);
    }
    return Promise.reject(error);
}

// Interceptor for responses
const responseInterceptor = response => {
    switch(response.status) {
        case 200: 
            console.log('successful')
            break;
        default:
            console.log(response, 'response')
    }
    return response;
}

Axios.interceptors.response.use(responseInterceptor, errorInterceptor);

export default Axios;