import apiClient from "../api_main";

export const GetSingleBlog = async(formattedMainTitle)=>{
    try{
        console.log("mainTitleatAPISide",formattedMainTitle);
        const responce = await apiClient.get(`/blogs/by?mainTitle=${formattedMainTitle}` );
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


export const GetSingleBlogbyID = async(id)=>{
    try{
        console.log("id",id);
        const responce = await apiClient.get(`/blogs/${id}`);
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


