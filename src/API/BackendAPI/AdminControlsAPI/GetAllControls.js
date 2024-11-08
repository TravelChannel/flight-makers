import apiClient from "../api_main";

export const getAllControls = async () => {
	try {
	  const res = await apiClient.get(`/generalTask/getAllControls`);
  
	  if (res.data.status === 'SUCCESS') {
		console.log(res.data.message, 'getAllControls success');
		return res;
	  } else {
		console.log(res.data.message, 'getAllControls danger');
	  }
	} catch (err) {
	  console.error(err.message, 'Danger');
	}
  };