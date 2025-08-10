import axios from 'axios';
export const getUser = () => axios.get('/user').then(res => res.data);
export const createUser = (user) => axios.post('/user', user);