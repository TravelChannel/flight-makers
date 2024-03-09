import apiClient from "../api_main";
export const GetServiceCharges = async (CommissionData) => {
    console.log("comm Passing OBJ at API", CommissionData);
    
    try {
        const response = await apiClient.post(`/commissionPercentage/getServiceCharges`, CommissionData);
        
        if (response.data.status === 'SUCCESS') {
            console.log(response.data.message, 'success');
            return response; 
        } else {
            console.log(response.data.message, 'danger');
            return null; 
        }
    } catch (error) {
        console.error(error.message, 'Danger');
        throw error; 
    }
}