import apiClient from "../api_main";

export const DeleteRating = async(id)=>{
	try{
		const responce = await apiClient.delete(`/ratings/${id}`);
		if(responce.data.status === 'SUCCESS'){
		console.log(responce.data.message, `RatingDelete success `);
		return responce;
		} else {
		console.log(responce.data.message, 'RatingDelete danger');
		throw new Error(responce.data.message); }
	}catch(error){
		console.error(error.message, 'Danger');
		throw error;
	}
}