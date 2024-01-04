import apiClient from "./api_main";

const userDetailsBackend = (setBackLoading)=>{
setBackLoading(true);
 return apiClient
 .get(`/pnrBooking`)
 .then((response)=>{
    console.log(JSON.stringify(response));
    setBackLoading(false);
    return response;
 })
 .catch((err)=>{
    console.log(err);
    setBackLoading(false);
    throw err;
 });
};

export default userDetailsBackend ;
