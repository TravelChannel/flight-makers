import apiClient from "../api_main";

export const GetTicketStatus = async () => {
	try {
	  const res = await apiClient.get(`/generalTask/getIsSabreCreateTicketAllowed`);
  
	  if (res.data.status === 'SUCCESS') {
		console.log(res.data.message, 'generalTask success');
		return res;
	  } else {
		console.log(res.data.message, 'generalTask danger');
	  }
	} catch (err) {
	  console.error(err.message, 'Danger');
	}
  };