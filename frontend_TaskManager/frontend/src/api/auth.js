import api from "./axios";

 export const loginuser=(data)=>{
    return api.post("/auth/login",data)
}

export const registeruser=(data)=>{
    return api.post("/auth/register",data)
}