import axios from 'axios';

const API_URL = 'http://localhost:8000/api/';

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,  // Для работы с cookies
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
});


export const register = async (data) => {
  return api.post('/users/', data);
};

// export const login = async (data) => {
//   return api.post('/token/', data);
// };

// fileService.js
// export const uploadFile = async (file, comment) => {
//   const formData = new FormData();
//   formData.append('file', file);
//   formData.append('comment', comment);
  
//   return api.post('/files/', formData, {
//     headers: {
//       'Content-Type': 'multipart/form-data'
//     }
//   });
// };