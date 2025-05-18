import axios from "axios";
import { toast } from "react-toastify";

const apiPublic = axios.create({
    baseURL: 'http://localhost:3000/api'
})

apiPublic.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        toast.error(error?.response?.data?.error || 'Server error')
        return Promise.reject(error);
    }
);

export default apiPublic