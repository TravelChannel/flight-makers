import apiClient from "../api_main";

export const ToggleRating = async (id) => {
	try {
	  const res = await apiClient.patch(`/ratings/toggleStatus/${id}`);
  
	  if (res.data.status === 'SUCCESS') {
		console.log(res.data.message, 'ToggleRataing success');
		return res;
	  } else {
		console.log(res.data.message, 'ToggleRataing danger');
	  }
	} catch (err) {
	  console.error(err.message, 'Danger');
	}
  };