import axios from 'axios'
const backendUrl ='http://localhost:3000/';
export const summarizeData=async(data)=>{
    try{
        const response = await axios.post(`${backendUrl}summarize`,data);
        return response;
    }catch (error){
        console.error(error.message);
        throw error
    }
};
export const roastData=async(data)=>{
    try{
        const response = await axios.post(`${backendUrl}roast`,data);
        return response;
    }catch (error){
        console.error(error.message);
        throw error
    }
};

export const research=async(limit)=>{
    try{
        const response = await axios.get(`${backendUrl}latest-search/${limit}`);
        return response;
    }catch (error){
        console.error(error.message);
        throw error
    }
};