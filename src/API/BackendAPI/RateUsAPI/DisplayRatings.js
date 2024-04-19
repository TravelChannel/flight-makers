import apiClient from "../api_main";

export const DisplayRatings = async()=>{
    try{

        const responce = await apiClient.get(`/ratings`);
        if(responce.data.status === 'SUCCESS'){
            console.log(responce.data.message, 'SUCCESS getRating');
            return responce;
        } else{
            console.log(responce.data.message, 'danger getRating');
        }

    }catch(error){
        console.error(error.message, 'Danger getRating');
    }
}