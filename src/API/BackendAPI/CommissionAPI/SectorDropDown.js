import apiClient from "../api_main";

export const SectorDropDown = async () => {
	try {
	  const result = await apiClient.get(`commissionPercentage/getSectorDropdown`);
  
	  if (result.data.status === 'SUCCESS') {
		console.log(result.data.message, 'SectorDropDown success');
		return result;
	  } else {
		console.log(result.data.message, 'SectorDropDown danger');
	  }
	} catch (err) {
	  console.error(err.message, 'Danger');
	}
  };