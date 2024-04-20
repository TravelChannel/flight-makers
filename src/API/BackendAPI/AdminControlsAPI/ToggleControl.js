import apiClient from "../api_main";

export const ToggleControl = async (id) => {
	try {
	  const res = await apiClient.patch(`/generalTask/toggleStatus/${id}`);
  
	  if (res.data.status === 'SUCCESS') {
		console.log(res.data.message, 'ToggleTicketStatus success');
		return res;
	  } else {
		console.log(res.data.message, 'ToggleTicketStatus danger');
	  }
	} catch (err) {
	  console.error(err.message, 'Danger');
	}
  };