import apiClient from "../api_main";

export const GetCommission = async () => {
	try {
	  const response = await apiClient.get(`/commissionPercentage`);
	  if (response.data.status === 'SUCCESS') {
		console.log(response.data.message, 'GetallPromotion success');
		return response;
	  } else {
		console.log(response.data.message, 'GetallPromotion danger');
		throw new Error(response.data.message); 
	  }
	} catch (err) {
	  console.error(err.message, 'Danger');
	  throw err; 
	}
  };