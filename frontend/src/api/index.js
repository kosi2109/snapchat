import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("snapchat_profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("snapchat_profile")).token
    }`;
  }

  return req;
});

export const removeUserAPI = (data) => API.post(`/chat/remove-user`, data);
export const getUsersAPI = () => API.get("/chat");
export const createGroupAPI = (data) => API.post(`/chat/group`, data);
export const userSearchAPI = (keyword) => API.get(`/user?search=${keyword}`);
export const getSingleChat = (id) => API.get(`/chat/${id}`);
export const getMessagesAPI = (id) => API.get(`/message/${id}`);
export const accessChat = (data) => API.post(`/chat`, data);
export const registerAPI = (form) => API.post("/auth/register", form);
export const loginAPI = (form) => API.post('/auth/login',form);
export const changeGroupNameAPI = (data) => API.post(`/chat/changeGroupName`,data);
export const deleteChatAPI = (data) => API.post(`http://localhost:5000/api/chat/delete`,data);
export const sentMessageAPI = (data) => API.post('http://localhost:5000/api/message',data);
export const addUserAPI = (data) => API.post(`http://localhost:5000/api/chat/add-user`,data);
export const updateUserAPI = (data) => API.post(`http://localhost:5000/api/user/update`,data);