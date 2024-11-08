import apiClient from "../api_main";

export const ReIssueApprovedReq = async (id) => {
	try {
	  const res = await apiClient.patch(`pnrBooking/doneReIssue/${id}`);
  
	  if (res.data.status === 'SUCCESS') {
		console.log(res.data.message, 'doneReIssue success');
		return res;
	  } else {
		console.log(res.data.message, 'doneReIssue danger');
	  }
	} catch (err) {
	  console.error(err.message, 'Danger');
	}
  };