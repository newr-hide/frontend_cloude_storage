import { api } from "./api"


export const deleteUser = async (userId) => {
    try {
      const response = await api.delete(`/admin/users/${userId}/`)
      return response.data
      
    } catch (error) {
      throw new Error('Ошибка при получении  пользователя')
    }
  }
