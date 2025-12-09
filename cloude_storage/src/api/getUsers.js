import { api } from "./api";

export const getUsers = async () => {
    try {
      const response = await api.get('/admin/users/')
      return response.data
    } catch (error) {
      throw new Error('Ошибка при получении списка пользователей')
    }
  }