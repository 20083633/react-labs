import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://pizzapal-23344-default-rtdb.europe-west1.firebasedatabase.app/'
});

export default instance;