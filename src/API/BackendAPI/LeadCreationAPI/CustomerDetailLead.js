import apiClient from "../api_main"

export const CustomerDetailLead = async(LeadCreationData) =>{
    try{

      console.log("LeadCreationData---v1",LeadCreationData);
        const responce = await apiClient.put(`/pnrBooking/createLeadCrm`,LeadCreationData);
         if(responce.data.status === 'SUCCESS'){
            console.log(responce.data.message , 'createLeadCrm Added SuccessFully');
            return responce;
         }else {
                console.log(responce.data.message, 'danger');
            }
     }catch(error){
        console.error( error.message, 'Danger');
     }

}




