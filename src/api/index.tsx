import Axios from "axios";



export const rootUrl = 'http://localhost:8989/api/';

//export const rootUrl = `https://${window.location.hostname}:443/`;

export const Http = Axios.create({
  baseURL: rootUrl,
});

Http.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("token");
 // config.headers["Content-Type"]= 'application/json'
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } 
  return config;
});



