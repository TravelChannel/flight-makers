import apiClient from "../api_main";

export const PaginatedBlogList = async(obj)=>{
    try{
         console.log("page",obj);
        const responce = await apiClient.get(`/blogs/findAllPaginated?page=${obj.page}&pageSize=${obj.pageSize}`);
        if(responce.data.status === 'SUCCESS'){
            console.log(responce.data.message, 'PaginatedBlogList-SUCCESS');
            return responce;
        } else{
            console.log(responce.data.message, 'PaginatedBlogList-danger');
        }

    }catch(error){
        console.error(error.message, 'PaginatedBlogList-Danger');
    }
}