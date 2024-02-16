import apiClient from "./api_main";

export const  VerificationAPi = async()=>{

    return apiClient
    .get('/users/me')
    .then((response)=>{
        console.log(JSON.stringify(response));
        // setBackLoading(false);
        console.log('usersME',response);
        return response;
     })
     .catch((err)=>{
        console.log(err);

        // setBackLoading(false);
        throw err;
     });

}