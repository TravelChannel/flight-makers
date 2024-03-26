import apiClient from "../api_main";

export const GetCategory = async () => {
	try {
	  const res = await apiClient.get(`/blogs/getTypesDropdown`);
  
	  if (res.data.status === 'SUCCESS') {
		console.log(res.data.message, 'GetCategory success');
		return res;
	  } else {
		console.log(res.data.message, 'GetCategory danger');
	  }
	} catch (err) {
	  console.error(err.message, 'Danger');
	}
  };