import apiClient from "../api_main";
export const FindByIdFilter = async(id)=>{
	try{
		const responce = await apiClient.get(`/pnrBooking?id=${id}`);
		if(responce.data.status === 'SUCCESS'){
		console.log(responce.data.message, `FindByIdFilter success `);
		return responce;
		} else {
		console.log(responce.data.message, 'FindByIdFilter danger');
		throw new Error(responce.data.message); }
	}catch(error){
		console.error(error.message, 'Danger');
		throw error; 
	}
}