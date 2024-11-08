import apiClient from "../api_main";

export const FareClassDropDown = async () => {
	try {
	  const result = await apiClient.get(`commissionPercentage/getFareClassDropdown`);
  
	  if (result.data.status === 'SUCCESS') {
		console.log(result.data.message, 'FareClassDropDown success');
		return result;
	  } else {
		console.log(result.data.message, 'FareClassDropDown danger');
	  }
	} catch (err) {
	  console.error(err.message, 'Danger');
	}
  };