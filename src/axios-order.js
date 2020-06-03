import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://burger-builder-93432.firebaseio.com/'
});

export default instance;
