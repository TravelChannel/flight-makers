// import apiClient from "./api_main";

// export const  VerificationAPi = async()=>{

//     return apiClient
//     .get('/users/me')
//     .then((response)=>{
//         console.log(JSON.stringify(response));
//         // setBackLoading(false);
//         console.log('usersME',response);
//         return response;
//      })
//      .catch((err)=>{
//         console.log(err);

//         // setBackLoading(false);
//         throw err;
//      });

// }

import apiClient from "./api_main";

export const VerificationAPi = async () => {
  try {
    const response = await apiClient.get("/users/me");
    console.log("usersME", response); // Assuming response.data contains the response body
    return response; // Return the data from the response
  } catch (error) {
    console.error(error);
    throw error; // Rethrow the error to be caught by the caller
  }
};
