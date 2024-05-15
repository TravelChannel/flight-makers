import apiClient from "../api_main"

export const SearchLogs = async(SearchLogData) =>{
    try{
        const responce = await apiClient.put(`/generaltask/flightSearch`,SearchLogData);
         if(responce.data.status === 'SUCCESS'){
            console.log(responce.data.message , 'SearchLogData Added SuccessFully');
            return responce;
         }else {
                console.log(responce.data.message, 'danger');
            }
     }catch(error){
        console.error( error.message, 'Danger');
     }

}




