import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:8080/car',
    // headers:{Authorization:`Bearer ${(token)}`}

});

export default instance;