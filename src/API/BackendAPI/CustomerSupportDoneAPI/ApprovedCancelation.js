import apiClient from "../api_main";

export const CancelationApprovedReq = async (id) => {
	try {
	  const res = await apiClient.patch(`pnrBooking/doneCancellation/${id}`);
  
	  if (res.data.status === 'SUCCESS') {
		console.log(res.data.message, 'doneCancellation success');
		return res;
	  } else {
		console.log(res.data.message, 'doneCancellation danger');
	  }
	} catch (err) {
	  console.error(err.message, 'Danger');
	}
  };