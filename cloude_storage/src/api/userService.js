import { api } from './api';

export const getUserInfo = async (userId) => {
 
    try {
        const response = await api.get(`/users/${userId}`);
        
        if (response.status >= 200 && response.status < 300) {
            console.log('Запрос прошел GetUserInfo')}
        
        return response.data;
        
    } catch (error) {
        
        if (error.response) {
            console.error('Ошибка сервера:', error.response.data);
            console.error('Статус:', error.response.status);
            console.error('Заголовки:', error.response.headers);
        } else if (error.request) {
            console.error('Запрос был сделан, но ответа нет userService', error.request);
        } else {
            console.error('Ошибка при создании запроса userService', error.message);
        }
        throw new Error(`Ошибка при получении информации о пользователе userService: ${error.message}`);
    }
};