import apiClient from "./api_main";

export const SeoAirLinesData = async () => {
	try {
	  const res = await apiClient.get(`/seoAirlinesData`);
  
	  if (res.data.status === 'SUCCESS') {
		console.log(res.data.message, 'SEO Detail fetched success');
		return res;
	  } else {
		console.log(res.data.message, 'SEO Detail fetched  danger');
	  }
	} catch (err) {
	  console.error(err.message, 'Danger');
	}
  };