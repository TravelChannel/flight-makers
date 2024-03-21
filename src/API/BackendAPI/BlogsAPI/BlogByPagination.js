import apiClient from "../api_main";

export const BlogByPagination = async(obj)=>{
    try{
            console.log("object to pass API",obj);
        const responce = await apiClient.get(`/blogs?pageNumber=${obj.pageNumber}&pageSize=${obj.pageSize}`);
        if(responce.data.status === 'SUCCESS'){
            console.log(responce.data.message, 'SUCCESS');
            return responce;
        } else{
            console.log(responce.data.message, 'danger');
        }

    }catch(error){
        console.error(error.message, 'BlogByPagination Danger');
    }
}
