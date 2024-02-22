import apiClient from "../api_main";

export const DeleteBlog = async(id)=>{
	try{
		const responce = await apiClient.delete(`/blogs/${id}`);
		if(responce.data.status === 'SUCCESS'){
		console.log(responce.data.message, `BlogDelete success `);
		return responce;
		} else {
		console.log(responce.data.message, 'BlogDelete danger');
		throw new Error(responce.data.message); }
	}catch(error){
		console.error(error.message, 'Danger');
		throw error;
	}
}