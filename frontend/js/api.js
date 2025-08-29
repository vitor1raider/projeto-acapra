import axios from 'https://cdn.jsdelivr.net/npm/axios/dist/axios.browser.min.js';

const api = axios.create({
  baseURL: 'http://localhost:3000'
})

export default api