import { api } from "./api"


export const deleteUser = async (userId) => {
    console.log(userId)
    try {
      const response = await api.delete(`/admin/users/${userId}/`)
      console.log('ok')
      
    } catch (error) {
      throw new Error('Ошибка при получении  пользователя')
    }
  }
