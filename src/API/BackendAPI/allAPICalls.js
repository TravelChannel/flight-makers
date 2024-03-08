import apiClient from './api_main';

export const UserBookingDetails = async (finalObject) => {
    console.log("hellloWorld", finalObject);
    
    try {
        const response = await apiClient.post(`/pnrBooking`, finalObject);
        
        if (response.data.status === 'SUCCESS') {
            console.log(response.data.message, 'success');
            return response; // Returning the response if successful
        } else {
            console.log(response.data.message, 'danger');
            return null; // Returning null or handle the error as needed
        }
    } catch (error) {
        console.error(error.message, 'Danger');
        throw error; // Re-throwing the error to be handled by the caller
    }
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

export const updateUserProfile = async (userUpdatedObject) => {
    try {
        const res = await apiClient.patch(`/users`, userUpdatedObject);
        if (res.data.status === 'SUCCESS') {
            console.log(res.data.message, 'success');
            return res;
        } else {
            console.log(res.data.message, 'danger');
        }
    } catch (err) {
        console.error(err.message, 'Danger');
    }
};
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
// ---Cancelation Req----
export const AdminCancellationReq = async () => {
	try {
	  const res = await apiClient.get(`/pnrBooking?isReqForCancellation=1`);
  
	  if (res.data.status === 'SUCCESS') {
		console.log(res.data.message, 'Cancellation success');
		return res;
	  } else {
		console.log(res.data.message, 'Cancellation danger');
	  }
	} catch (err) {
	  console.error(err.message, 'Danger');
	}
  };

//   ------ReIssue Req------------
export const AdminReIssueReq = async () => {
	try {
	  const res = await apiClient.get(`/pnrBooking?isReqForReIssue=1`);
  
	  if (res.data.status === 'SUCCESS') {
		console.log(res.data.message, 'ReIssue success');
		return res;
	  } else {
		console.log(res.data.message, 'ReIssue danger');
	  }
	} catch (err) {
	  console.error(err.message, 'Danger');
	}
  };
//   --------ReFund Req--------------------
export const AdminRefundReq = async () => {
	try {
	  const res = await apiClient.get(`/pnrBooking?isReqForRefund=1`);
  
	  if (res.data.status === 'SUCCESS') {
		console.log(res.data.message, 'Refund success');
		return res;
	  } else {
		console.log(res.data.message, 'Refund danger');
	  }
	} catch (err) {
	  console.error(err.message, 'Danger');
	}
  };
// ---------------------------Promotions API start----------------------------
// export const AddPromotions = async(PromotionsValue)=>{
//    console.log("PromotionsValueAPI",PromotionsValue);
// 	   apiClient
// 		   .post(`/promotions`,PromotionsValue)
// 		   .then((res) => {
// 			   if (res.data.status === 'SUCCESS') {

// 				   console.log( res.data.message, ' Promotion success');
//                  return res;
// 			   } else {
// 				   console.log(res.data.message, 'Promotion danger');
// 			   }
// 		   })
// 		   .catch((err) => {
// 			   console.error( err.message, 'Danger');
// 		   });
// }
export const AddPromotions = async (PromotionsValue) => {
	console.log("PromotionsValueAPI", PromotionsValue);
  
	try {
	  const response = await apiClient.post(`/promotions`, PromotionsValue);
  
	  if (response.data.status === 'SUCCESS') {
		console.log(response.data.message, ' Promotion success');
		return response;
	  } else {
		console.log(response.data.message, 'Promotion danger');
	  }
	} catch (err) {
	  console.error(err.message, 'Danger');
	  throw err; // Re-throw the error to propagate it up the call stack if needed
	}
  };
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
export const DeletePromotion =async(id,setPromotions)=>{
	apiClient
			.delete(`/promotions/${id}`)
			.then((res) => {
				if (res.data.status === 'SUCCESS') {

					console.log( res.data.message, 'Prom_Delte success');
					setPromotions((prevPromotions) => {
						console.log('Previous Promotions State:', prevPromotions);
						const newPromotions = prevPromotions.filter((promotion) => promotion.id !== id);
						console.log('New Promotions State:', newPromotions);
						return newPromotions;
					  });
				} else {
					console.log(res.data.message, 'Prom_Delte danger');
				}
			})
			.catch((err) => {
				console.error( err.message, 'Danger');
			});

}
// -----------------Update Promotion----------------------------------
export const UpdatePromotion = async(updateID)=>{
	try{
		const responce = await apiClient.patch(`/promotions/${updateID}`);
		if(responce.data.status === 'SUCCESS'){
		console.log(responce.data.message, `UpdatePromotion success for id ${updateID}`);
		return responce;
		} else {
		console.log(responce.data.message, 'UpdatePromotion danger');
		throw new Error(responce.data.message); }
	}catch(error){
		console.error(error.message, 'Danger');
		throw error; 
	}
}

// -------------------all User Lists ----------------------------------
export const AllUsersDetail = async()=>{
	try{
		const responce = await apiClient.get(`/users`);
		if(responce.data.status === 'SUCCESS'){
		console.log(responce.data.message, `AllUsersDetail success `);
		return responce;
		} else {
		console.log(responce.data.message, 'AllUsersDetail danger');
		throw new Error(responce.data.message); }
	}catch(error){
		console.error(error.message, 'Danger');
		throw error; 
	}
}


//----------------fetching alluserDetail by ID----------------------------

export const UserDetailbyID = async(userIdforDetail)=>{
	try{
		const responce = await apiClient.get(`/pnrBooking/${userIdforDetail}`);
		if(responce.data.status === 'SUCCESS'){
		console.log(responce.data.message, `SingleUserDetails success `);
		return responce;
		} else {
		console.log(responce.data.message, 'SingleUserDetails danger');
		throw new Error(responce.data.message); }
	}catch(error){
		console.error(error.message, 'Danger');
		throw error;
	}
}


// ---------------------Activate / Deactivate Promotions ---------------------

// export const togglePromotion = async (id)=>{
// 	try{
// 		const responce = await apiClient.patch(`/promotions/toggleStatus/${id}`);
// 		if(responce.data.status === 'SUCCESS'){
// 		console.log(responce.data.message, `Promotion-Status Toggle success `);
// 		return responce;
// 		} else {
// 		console.log(responce.data.message, 'Promotion-Status Toggle danger');
// 		throw new Error(responce.data.message); }
// 		}catch(error){
// 		console.error(error.message,'Danger Danger');
// 		throw error;
// 	}
// }
export const togglePromotion = async (id) => {
    try {
        const response = await apiClient.patch(`/promotions/toggleStatus/${id}`);
        if (response.data.status === 'SUCCESS') {
            console.log(response.data.message, `Promotion-Status Toggle success`);
            return response;
        } else {
            console.log(response.data.message, 'Promotion-Status Toggle danger');
            throw new Error(response.data.message);
        }
    } catch (error) {
        console.error(error.message, 'Danger Danger');
        throw error;
    }
}


// --------------------AdminSide All Varified Bookings-----------------------

// export const allPaidBookings = async () =>{
// 	try{
// 		const responce = await apiClient.get(`/pnrPayment`);
// 		if (responce.data.status === 'SUCCESS') {
//             console.log(responce.data.message, `PaidBookings Fetch SuccessFully`);
//             return responce;
//         } else {
//             console.log(responce.data.message, 'PaidBookings  danger');
//             throw new Error(responce.data.message);
//         }

// 	}catch(error){
// 		console.error(error.message, 'Danger Danger');
//         throw error;
// 	}
// }

export const allPaidBookings = async () =>{
	try{
		const responce = await apiClient.get(`/pnrBooking/paid?isPaid=1`);
		if (responce.data.status === 'SUCCESS') {
            console.log(responce.data.message, `PaidBookings Fetch SuccessFully`);
            return responce;
        } else {
            console.log(responce.data.message, 'PaidBookings  danger');
            throw new Error(responce.data.message);
        }

	}catch(error){
		console.error(error.message, 'Danger Danger');
        throw error;
	}
}

// -------------------------------------Send OTP -------------------------------------------

export const sendOTPCode = async (getOTPData) => {
	try {
	  const response = await apiClient.post(`/auth/requestOtp`, getOTPData);
	  
	  if (response.data.status === 'SUCCESS') {
		console.log(response.data.message, 'SendOTP success');
		return response;
	  } else {
		console.log(response.data.message, 'SendOTP danger');
	  }
	} catch (error) {
	  console.error(error.message, 'Danger');
	//   alert("sendOTP",error.message);
	}
  }


//   --------------------Verify OTP -----------------------------------------------------------

export const verifyOTPRes = async (getOTPData, enteredOtp) => {
	try {
	  const response = await apiClient.post(`/auth/login`, {
		...getOTPData,
		otp: enteredOtp
	  });
	  
	  if (response.data.status === 'SUCCESS') {
		console.log(response.data.message, 'VerifyOTP success');
		return response;
	  } else {
		console.log(response.data.message, 'VerifyOTP danger');
	  }
	} catch (error) {
	  console.error(error.message, 'Danger');
	}
  }