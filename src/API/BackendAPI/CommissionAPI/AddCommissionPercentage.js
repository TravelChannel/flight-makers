import apiClient from "../api_main";

export const AddCommissionPercentage = async(PassCommData)=>{
     try{
        const responce = await apiClient.post(`/commissionPercentage`,PassCommData);
         if(responce.data.status === 'SUCCESS'){
            console.log(responce.data.message , 'Commmion Added SuccessFully');
            return responce;
         }else {
                console.log(responce.data.message, 'danger');
            }

     }catch(error){
        console.error( error.message, 'Danger');
     }

}