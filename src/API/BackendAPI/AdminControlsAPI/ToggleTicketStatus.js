import apiClient from "../api_main";

export const ToggleTicketStatus = async () => {
	try {
	  const res = await apiClient.get(`/generalTask/getAllControls`);
  
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