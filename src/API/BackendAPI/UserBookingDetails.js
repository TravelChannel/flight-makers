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
			.patch(`/pnrBooking/reqForRefund/3`,id)
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
	// .patch(`/pnrBooking/reqForReIssue/${id}`,id)
			.patch(`/pnrBooking/reqForReIssue/3`,id)
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
			.patch(`/pnrBooking/reqForCancellation/3`,id)
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

// export const updateUserProfile = async (userUpdatedObject) => {
// 	try {
// 	  const res = await apiClient.patch(`/users`, userUpdatedObject);
  
// 	  if (res.data.status === 'SUCCESS') {
// 		// Access the updated user profile data from the response
// 		const updatedUserProfile = res.data.updatedUserProfile;
// 		console.log('Profile updated successfully:', updatedUserProfile);
// 		return updatedUserProfile; // You can return the updated data if needed
// 	  } else {
// 		console.log('Update failed:', res.data.message, 'danger');
// 		return null; // Handle failure, maybe return null or throw an error
// 	  }
// 	} catch (err) {
// 	  console.error('Error updating profile:', err.message, 'danger');
// 	  throw err; // Rethrow the error or handle it as needed
// 	}
//   };
