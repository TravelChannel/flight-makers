import apiClient from "./api_main";

export const  VerificationAPi = async()=>{

    return apiClient
    .get('/users/me')
    .then((response)=>{
        console.log(JSON.stringify(response));
        // setBackLoading(false);
        return response;
     })
     .catch((err)=>{
        console.log("111111111111111111111111");
        console.log(err);
        console.log("2222222222222222222222");

        // setBackLoading(false);
        throw err;
     });

}