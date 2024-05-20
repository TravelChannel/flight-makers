import apiClient from "../api_main";
export const FindByPnrFilter = async(pnr)=>{
	try{
		const responce = await apiClient.get(`/pnrBooking?pnr=${pnr}`);
		if(responce.data.status === 'SUCCESS'){
		console.log(responce.data.message, `FindByPnrFilter success `);
		return responce;
		} else {
		console.log(responce.data.message, 'FindByPnrFilter danger');
		throw new Error(responce.data.message); }
	}catch(error){
		console.error(error.message, 'Danger');
		throw error; 
	}
}