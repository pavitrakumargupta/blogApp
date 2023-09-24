import axios from "axios";
 

const instance = axios.create({
  // baseURL: "http://localhost:5000",
   baseURL: "https://blogapp-9sxp.onrender.com",
  // headers: {'Access-Control-Allow-Origin': '*'}
});

export default instance;
