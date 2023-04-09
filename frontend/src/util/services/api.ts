import axios from 'axios';

export const api = axios.create({ baseURL: 'https://cafeache-api.onrender.com/api' });
