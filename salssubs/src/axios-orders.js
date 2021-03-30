import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://salssubs-cbb59-default-rtdb.europe-west1.firebasedatabase.app/'
});

export default instance;