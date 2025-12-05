import { api } from "./api";

export const updateFile = async (fileId, data) => {
      
      const response = await api.put(
          `files/${fileId}/`, data 
      );
      
      return response.data;
  
};