import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,  // Для работы с cookies
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})

const refreshToken = async () => {
  try {
        const response = await api.post('/token/refresh/', {},
      {
        withCredentials: true,
        baseURL: API_URL
      }
    );
    return response.data;
  } catch (error) {

    localStorage.removeItem('user');
    window.location.href = '/';
    return Promise.reject(error);
  }
}

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config
    
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      
      try {
        await refreshToken()
        return api(originalRequest)
      } catch (err) {
        return Promise.reject(err)
      }
    }
    
    return Promise.reject(error)
  }
);

api.interceptors.request.use(config => {

// для передачи файлов
  if (config.data instanceof FormData) {
    delete config.headers['Content-Type']
    return config
  }

  //Для скачивания
  if (config.url.includes('/download/') && config.method === 'GET') {
    config.responseType = 'blob';
  }

  // Для JSON данных
  if (typeof config.data === 'object' && !Array.isArray(config.data) && config.data !== null) {
    config.headers['Content-Type'] = 'application/json';
  }


  return config
})



export const register = async (data) => {
  try {
    const response = await api.post('/users/', data)
    

    const user = response.data.user
    console.log(user)
    localStorage.setItem('user_id', user.id)
    localStorage.setItem('user_login', user.login)
    localStorage.setItem('user_email', user.email)
    localStorage.setItem('is_admin', user.is_admin)
    
    return response.data
  } catch (error) {
    if (error.response) {
      console.error('Ошибка регистрации:', error.response.data)
      throw new Error(error.response.data.message || 'Ошибка при регистрации')
    } else {
      throw new Error('Ошибка при регистрации')
    }
  }
}

export const loginFunction = async (credentials) => {
  try {
    const response = await api.post('/auth', credentials)
    console.log(response.data)
    const user = response.data.user
    console.log(user)
    localStorage.setItem('user_id', user.id)
    localStorage.setItem('user_login', user.login)
    localStorage.setItem('user_email', user.email)
    localStorage.setItem('is_admin', user.is_admin)
    
    return {
      user: {
        id: user.id,
        login: user.login,
        email: user.email,
        is_admin: user.is_admin
      }
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      throw new Error('Неверные логин или пароль')
    }
    throw new Error('Ошибка при авторизации')
  }
}
