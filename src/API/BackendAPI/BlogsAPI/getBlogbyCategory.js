import apiClient from "../api_main";

export const GetBlogsbyCategory = async(id)=>{
    try{

        const responce = await apiClient.get(`/blogs?blogTypeId=${id}`);
        if(responce.data.status === 'SUCCESS'){
            console.log(responce.data.message, 'getBlogByCategory-SUCCESS');
            return responce;
        } else{
            console.log(responce.data.message, 'getBlogByCategory-danger');
        }

    }catch(error){
        console.error(error.message, 'getBlogByCategory-Danger');
    }
}