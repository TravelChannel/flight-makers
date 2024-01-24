import apiClient from './api_main';

export const UserBookingDetails = async(finalObject)=>{
     const results  = '123';
    console.log("hellloWorld",finalObject);
		apiClient
			.post(`/pnrBooking`, finalObject)
			.then((res) => {
				if (res.data.status === 'SUCCESS') {

					console.log( res.data.message, 'success');

				} else {
					console.log(res.data.message, 'danger');
				}
			})
			.catch((err) => {
				console.error( err.message, 'Danger');
			});

   return results;

}
// ---------------------ReFund API Called-----------------------

export const ReFund = async(id)=>{
	apiClient
			.patch(`/pnrBooking/reqForRefund/${id}`)
			.then((res) => {
				if (res.data.status === 'SUCCESS') {

					console.log( res.data.message, 'success ReFund');

				} else {
					console.log(res.data.message, 'danger');
				}
			})
			.catch((err) => {
				console.error( err.message, 'Danger');
			});

}
// ---------------------ReIssue API Called-----------------------

export const ReIssue = async(id)=>{
	apiClient
			.patch(`/pnrBooking/reqForReIssue/${id}`)
			.then((res) => {
				if (res.data.status === 'SUCCESS') {

					console.log( res.data.message, 'success ReIssue');

				} else {
					console.log(res.data.message, 'danger');
				}
			})
			.catch((err) => {
				console.error( err.message, 'Danger');
			});

}

// ---------------------Cancelation API Called-----------------------


export const Cancelation = async(id)=>{
	apiClient
			.patch(`/pnrBooking/reqForCancellation/${id}`)
			.then((res) => {
				if (res.data.status === 'SUCCESS') {

					console.log( res.data.message, 'success Cancelation');

				} else {
					console.log(res.data.message, 'danger');
				}
			})
			.catch((err) => {
				console.error( err.message, 'Danger');
			});

}

// ------------------------user Profile Update ----------------------------

export const updateUserProfile =async(userUpdatedObject)=>{
	apiClient
			.patch(`/users`, userUpdatedObject)
			.then((res) => {
				if (res.data.status === 'SUCCESS') {

					console.log( res.data.message, 'success');

				} else {
					console.log(res.data.message, 'danger');
				}
			})
			.catch((err) => {
				console.error( err.message, 'Danger');
			});

}
// -------------------------------user Logout--------------------------------

export const UserLogOut =async()=>{
	apiClient
			.post(`/auth/logout`)
			.then((res) => {
				if (res.data.status === 'SUCCESS') {

					console.log( res.data.message, 'success');

				} else {
					console.log(res.data.message, 'danger');
				}
			})
			.catch((err) => {
				console.error( err.message, 'Danger');
			});

}

// -----------------------------Customer Support Admin Side --------------------------------

export const  AdminSideCustomerSupp = async()=>{
	apiClient
	.get(`/pnrBooking?isReqForReIssue=3`)
	.then((res) => {
		if (res.data.status === 'SUCCESS') {

			console.log( res.data.message, 'success');

		} else {
			console.log(res.data.message, 'danger');
		}
	})
	.catch((err) => {
		console.error( err.message, 'Danger');
	});

}