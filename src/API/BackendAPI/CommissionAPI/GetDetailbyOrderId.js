import apiClient from "../api_main";

export const getDetailByOrderId = async (id) => {
	try {
	  const res = await apiClient.get(`/pnrBooking/findByOrderId?orderId=${id}`);
  
	  if (res.data.status === 'SUCCESS') {
		console.log(res.data.message, 'GetOrderID success');
		return res;
	  } else {
		console.log(res.data.message, 'GetOrderID danger');
	  }
	} catch (err) {
	  console.error(err.message, 'Danger');
	}
  };