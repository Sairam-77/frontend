import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:5000/",
  headers: {
    "Content-type": "application/json",
  },
});

const signUp = async (data)=>{
   const response = await apiClient.post("auth/signup",data);
   return response.data;
}

const signIn= async (data)=>{
   const response = await apiClient.post("auth/signin",data);
   return response.data;
}


const AuthService = {
 
 signUp,
 signIn
}

export default AuthService;