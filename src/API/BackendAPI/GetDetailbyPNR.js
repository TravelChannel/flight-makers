import apiClient from "./api_main";

export const GetDetailByPNR = async(pnr)=>{
	try{
		const responce = await apiClient.get(`/pnrBooking/findByPnr?pnr=${pnr}`);
		if(responce.data.status === 'SUCCESS'){
		console.log(responce.data.message, `getUserDetailbyPNR success `);
		return responce;
		} else {
		console.log(responce.data.message, 'getUserDetailbyPNR danger');
		throw new Error(responce.data.message); }
	}catch(error){
		console.error(error.message, 'Danger');
		throw error;
	}
}