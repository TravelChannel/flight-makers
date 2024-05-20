import apiClient from "../api_main";
export const SearchLog = async()=>{
	try{
		const responce = await apiClient.get(`/generalTask/flightSearch`);
		if(responce.data.status === 'SUCCESS'){
		console.log(responce.data.message, `SearchLog success `);
		return responce;
		} else {
		console.log(responce.data.message, 'SearchLog danger');
		throw new Error(responce.data.message); }
	}catch(error){
		console.error(error.message, 'Danger');
		throw error; 
	}
}