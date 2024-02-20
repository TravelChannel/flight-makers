import apiClient from "../api_main";

export const AddBlogAPI  = async(formData)=>{

    try{
        const responce = apiClient.post(`/blogs`,formData)
        console.log("formDataatAPI",formData);
        if(responce.data.status==='SUCCESS'){
            console.log(responce.data.status,'SUCCESS');
            return responce
        }else{
            console.log(responce.data.message, 'danger');
        }
    }catch (error) {
        console.error(error.message, 'Danger');
    }

}