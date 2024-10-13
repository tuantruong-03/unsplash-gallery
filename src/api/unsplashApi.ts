import axios from 'axios';
import { BASE_URL } from './const';


const unsplashApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`, // Use your Unsplash API key from environment variables
  },
});

export default unsplashApi;
