import axios from 'axios'

const api = axios.create({
  withCredentials: true,
  baseURL: 'http://rem-rest-api.herokuapp.com/api'
});

export default api