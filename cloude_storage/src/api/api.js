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
api.interceptors.request.use(config => {
  if (config.url !== '/users/' || config.method !== 'post') {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
}
return config;
});


export const register = async (data) => {
  try {
      const response = await api.post('/users/', data);
      const { user, tokens } = response.data;
      const { refresh, access } = tokens;
      console.log(response.data)
      localStorage.setItem('refresh_token', refresh);
      localStorage.setItem('user_id', user.id);
      localStorage.setItem('user_login', user.login);
      localStorage.setItem('user_email', user.email);
      localStorage.setItem('access_token', access);

      return response.data;
  } catch (error) {
      if (error.response) {
          console.error('Ошибка регистрации:', error.response.data);
          throw new Error(error.response.data.message || 'Ошибка при регистрации');
      } else {
          throw new Error('Ошибка при регистрации');
      }
  }
};

export const loginFunction = async (credentials) => {
  // console.log(credentials)
  try {
    const response = await api.post('/auth', credentials);
    // console.log(response.data)
    const { access, refresh, user } = response.data;
    // console.log(response.data)
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);
    localStorage.setItem('user_id', user.id);
    localStorage.setItem('user_login', user.login);
    localStorage.setItem('user_mail', user.email);
    
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      throw new Error('Неверные логин или пароль');
    }
    throw new Error('Ошибка при авторизации');
  }
};
