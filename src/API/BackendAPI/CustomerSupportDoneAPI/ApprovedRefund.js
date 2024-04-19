import apiClient from "../api_main";

export const RefundApprovedReq = async (id) => {
	try {
	  const res = await apiClient.patch(`pnrBooking/doneRefund/${id}`);
  
	  if (res.data.status === 'SUCCESS') {
		console.log(res.data.message, 'doneRefund success');
		return res;
	  } else {
		console.log(res.data.message, 'doneRefund danger');
	  }
	} catch (err) {
	  console.error(err.message, 'Danger');
	}
  };