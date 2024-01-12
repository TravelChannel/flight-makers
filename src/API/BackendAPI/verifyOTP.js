export const verifyOTP =async (getOTPData,enteredOtp)=>{


    // console.log("yooo, i am here for verification",getOTPData);
    console.log('yooo, user OTP',enteredOtp);
    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Cookie", "refresh_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiaXNBZG1pbiI6MCwiaWF0IjoxNzA1MDM4NTI5LCJleHAiOjE3MDU2NDMzMjl9.ucn-Lp7SHwgwTBTzikEtPjiV_lvf-_GcK7GC3H_xxoc; user_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwicGhvbmVOdW1iZXIiOiIzNDA4OTIyMzc1IiwiaXNBZG1pbiI6MCwiaWF0IjoxNzA1MDM4NTI5LCJleHAiOjE3MDUwNTI5Mjl9.6ei402IuI0IV6XiLt7I0KbDYJHUmFucNPDbNbnSJeKc");

var raw = JSON.stringify({
  "phoneNumber": getOTPData.phoneNumber,
  "countryCode": getOTPData.coutryCode,
  "otp": enteredOtp
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};


try{
    const responce = await fetch("http://localhost:5000/api/pnrUsers/userLogin", requestOptions);
    const Verifyresult = await responce.json();
    console.log("OTPVerifyResults",Verifyresult);
    return Verifyresult;
}catch (error) {
    console.error("OTPSentCode", error);
}

}