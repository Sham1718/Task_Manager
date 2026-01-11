import api from "./axios";

export const getAll=()=>{
    return api.get("/api/task");
}

export const create=(data)=>{
    return api.post("/api/task",data);
}

export const getById=(id)=>{
    return api.get(`/api/task/${id}`);
}

export const update=(id,data)=>{
    return api.put(`/api/task/update/${id}`,data);

}

export const deletetask=(id)=>{
    return api.delete(`/api/task/delete/${id}`);
}

export const updateStatus=(id,data)=>{
    return api.patch(`/api/task/update/status/${id}`,data);
}