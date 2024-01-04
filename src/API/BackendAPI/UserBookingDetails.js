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


