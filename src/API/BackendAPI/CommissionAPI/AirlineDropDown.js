import apiClient from "../api_main";

export const AirlineDropDown = async () => {
	try {
	  const res = await apiClient.get(`commissionPercentage/getAirlineDropdown`);
  
	  if (res.data.status === 'SUCCESS') {
		console.log(res.data.message, 'AirlineDropDown success');
		return res;
	  } else {
		console.log(res.data.message, 'AirlineDropDown danger');
	  }
	} catch (err) {
	  console.error(err.message, 'Danger');
	}
  };