 import axios from 'axios'


 const API_URL = 'http://localhost:8000/api/'

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,  // Для работы с cookies
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})

const getTokens = () => {
  const accessToken = localStorage.getItem('access_token')
  const refreshToken = localStorage.getItem('refresh_token')
  return { accessToken, refreshToken }
}

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      
      try {
        const { refreshToken } = getTokens()
        
        if (!refreshToken) {
          throw new Error('Refresh token отсутствует')
        }
        
        const response = await api.post('/token/refresh/', {
          refresh: refreshToken
        }, {
          headers: {
            'Content-Type': 'application/json'
          },
          timeout: 5000
        })
        
        const { access, refresh } = response.data
        
        localStorage.setItem('access_token', access)
        localStorage.setItem('refresh_token', refresh)
        
        api.defaults.headers.common['Authorization'] = `Bearer ${access}`
        
        return api(originalRequest)
      } catch (refreshError) {
        console.error('Ошибка обновления токена:', refreshError)
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        window.location.href = '/'
      }
    }
    return Promise.reject(error)
  }
)

api.interceptors.request.use(config => {

  const token = localStorage.getItem('access_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
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
      const { user, tokens } = response.data
      const { refresh, access } = tokens
      console.log(response.data)
      localStorage.setItem('refresh_token', refresh)
      localStorage.setItem('user_id', user.id)
      localStorage.setItem('user_login', user.login)
      localStorage.setItem('user_email', user.email)
      localStorage.setItem('access_token', access)

      return response.data
  } catch (error) {
      if (error.response) {
          console.error('Ошибка регистрации:', error.response.data)
          throw new Error(error.response.data.message || 'Ошибка при регистрации')
      } else {
          throw new Error('Ошибка при регистрации')
      }
  }
};

export const loginFunction = async (credentials) => {
  // console.log(credentials)
  try {
    const response = await api.post('/auth', credentials)
    // console.log(response.data)
    const { access, refresh, user } = response.data
    // console.log(response.data)
    localStorage.setItem('access_token', access)
    localStorage.setItem('refresh_token', refresh)
    localStorage.setItem('user_id', user.id)
    localStorage.setItem('user_login', user.login)
    localStorage.setItem('user_email', user.email)
    localStorage.setItem('is_admin', user.is_admin)
    
    return {
      token: access,
      user: {
          id: user.id,
          login: user.login,
          email: user.email,
          is_admin: user.is_admin
      }}
  } catch (error) {
    if (error.response && error.response.status === 401) {
      throw new Error('Неверные логин или пароль')
    }
    throw new Error('Ошибка при авторизации')
  }
}
