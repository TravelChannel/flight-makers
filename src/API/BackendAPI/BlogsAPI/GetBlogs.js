import apiClient from "../api_main";

export const GetBlogs = async()=>{
    try{

        const responce = await apiClient.get(`/blogs`);
        if(responce.data.status === 'SUCCESS'){
            console.log(responce.data.message, 'SUCCESS');
            return responce;
        } else{
            console.log(responce.data.message, 'danger');
        }

    }catch(error){
        console.error(error.message, 'Danger');
    }
}