import apiClient from './api_main';
export const UserBookingDetails = async(finalObject)=>{
     const results  = '123';
    console.log("hellloWorld",finalObject);

    // setIsLoading(true);
		apiClient
			.post(`/pnrBooking`, finalObject)
			.then((res) => {
				// console.log('myformik', myFormik.values);
				// setIsLoading(false);
				if (res.data.status === 'ok') {
					// finalObject.resetForm();
					console.log( res.data.message, 'success');
                    console.log("hello KAhsif1111");
					// eslint-disable-next-line react/destructuring-assignment
					// props.refreshTableRecords();
					// setState(false);
					// setLastSave(moment());
					// dispatch(
					// 	updateMasterDetails([
					// 		store.data.masterDetails.refreshDropdowns + 1,
					// 		'refreshDropdowns',
					// 	]),
					// );
				} else {
					console.log(res.data.message, 'danger');
                    console.log("hello KAhsif22222");
					// setIsLoading(false);
				}
			})
			.catch((err) => {
				// setIsLoading(false);
				console.error( err.message, 'Danger');
				// setIsLoading(false);
			});

   return results;

}