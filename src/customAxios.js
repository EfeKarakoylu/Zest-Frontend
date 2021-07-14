import axios from 'axios';
import {getToken} from './const';

export const API_URL = "http://localhost:5000/";
//export const API_URL = "http://10.200.20.101:32000/api/opdp/";

const customAxios = axios.create({
    baseURL: API_URL
});

// Request interceptor for API calls
customAxios.interceptors.request.use(
    async config => {
        config.headers.common['Authorization'] = 'Bearer ' + getToken();
        config.headers.common['Content-Type'] = 'application/json';

        return config;
    },
    error => {
        Promise.reject(error)
    });


customAxios.interceptors.response.use(response => {
        return response;
    },
    async function (error) {
        if (error.response.status === 401) {
            //window.location.href = "https://mebbis.meb.gov.tr/ssologinBIDB.aspx?id=98";
        }
        return Promise.reject(error);
    });

export default customAxios;
