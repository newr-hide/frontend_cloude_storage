import { api } from "./api";

export const updateFile = async (fileId, data) => {
        // console.log(fileId, data)
      const response = await api.put(
          `files/${fileId}/`, data
            
          
      );
      
      return response.data;
  
};

