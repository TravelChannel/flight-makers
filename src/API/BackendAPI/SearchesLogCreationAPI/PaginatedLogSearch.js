import apiClient from "../api_main";

export const PaginatedLogSearches = async(obj)=>{
    try{
         console.log("OBJ-StartDate-at-api",obj.startDate);
         console.log("OBJ-EndDate-at-api",obj.endDate);
        const responce = await apiClient.get(`/generalTask/flightSearch?pageNumber=${obj.page}&pageSize=${obj.pageSize}&startDate=${obj.startDate}&endDate=${obj.endDate}`);
        if(responce.data.status === 'SUCCESS'){
            console.log(responce.data.message, 'PaginatedLogSearches-SUCCESS');
            return responce;
        } else{
            console.log(responce.data.message, 'PaginatedLogSearches-danger');
        }

    }catch(error){
        console.error(error.message, 'PaginatedLogSearches-Danger');
    }
}