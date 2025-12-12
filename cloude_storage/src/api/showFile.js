import { api } from "./api"


export const showFile = async (fileId) => {
    try {
      const response = await api.get(`/show-file/${fileId}`, {
        responseType: 'blob' 
      });
      
      const blob = new Blob([response.data], {
        type: response.headers['content-type']
      });
      
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
      

      setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 10000); 
      
    } catch (error) {
      console.error('Ошибка при просмотре файла:', error);
      throw error;
    }
  };