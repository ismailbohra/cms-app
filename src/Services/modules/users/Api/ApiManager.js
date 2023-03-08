import axios from 'axios'

const ApiManager = axios.create({
  baseURL: 'http://192.168.29.191:5000/v1/',
  responseType: 'json',
  withCredentials: true,
})

export default ApiManager
