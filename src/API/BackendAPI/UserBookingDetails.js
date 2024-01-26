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

					console.log( res.data.message, 'logout success');

				} else {
					console.log(res.data.message, 'logout danger');
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

			console.log( res.data.message, 'ReIssue success');

		} else {
			console.log(res.data.message, 'ReIssue danger');
		}
	})
	.catch((err) => {
		console.error( err.message, 'Danger');
	});

}

// ---------------------------Promotions API start----------------------------
export const AddPromotions = async(PromotionsValue)=>{
   console.log("PromotionsValueAPI",PromotionsValue);
	   apiClient
		   .post(`/promotions`,PromotionsValue)
		   .then((res) => {
			   if (res.data.status === 'SUCCESS') {

				   console.log( res.data.message, ' Promotion success');
                 
			   } else {
				   console.log(res.data.message, 'Promotion danger');
			   }
		   })
		   .catch((err) => {
			   console.error( err.message, 'Danger');
		   });
}

// ----------------Get All Promotions---------------------------

export const GetAllPromotions = async () => {
	try {
	  const response = await apiClient.get(`/promotions`);
	  if (response.data.status === 'SUCCESS') {
		console.log(response.data.message, 'GetPromotion success');
		return response;
	  } else {
		console.log(response.data.message, 'GetPromotion danger');
		throw new Error(response.data.message); 
	  }
	} catch (err) {
	  console.error(err.message, 'Danger');
	  throw err; 
	}
  };

//   ------------Delete Promotion-----------------------------------
export const DeletePromotion =async(id)=>{
	apiClient
			.delete(`/promotions/${id}`)
			.then((res) => {
				if (res.data.status === 'SUCCESS') {

					console.log( res.data.message, 'Prom_Delte success');

				} else {
					console.log(res.data.message, 'Prom_Delte danger');
				}
			})
			.catch((err) => {
				console.error( err.message, 'Danger');
			});

}