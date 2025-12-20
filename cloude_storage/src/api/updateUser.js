import { api } from "./api"

export const updateUserAdminStatus = async (userId, isAdmin) => {
    console.log(userId, isAdmin)
    try {
        const response = await api.patch(`/admin/users/${userId}/`, {is_admin: isAdmin})
        return response.data
    } catch (error) {
        throw new Error('Ошибка при обновлении статуса администратора');
    }
}