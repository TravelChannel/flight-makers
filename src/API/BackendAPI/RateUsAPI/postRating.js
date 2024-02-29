import apiClient from "../api_main";

export const postRating = async(passData)=>{
    try{
       const responce = await apiClient.post(`/ratings`,passData);
        if(responce.data.status === 'SUCCESS'){
           console.log(responce.data.message , 'Rating Added SuccessFully');
           return responce;
        }else {
               console.log(responce.data.message, 'danger');
           }

    }catch(error){
       console.error( error.message, 'Danger');
    }

}