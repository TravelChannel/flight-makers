export const  sendOTP = async(getOTPData)=>{

    console.log("i am here", getOTPData);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", "refresh_token=undefined; user_token=undefined");
    
    var raw = JSON.stringify({
      "phoneNumber": getOTPData.phoneNumber ,
      "countryCode": getOTPData.coutryCode,
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    try{
        const responce = await fetch("http://localhost:5000/api/pnrUsers/requestOtp", requestOptions);
        const result = await responce.json();
        console.log("OTPResults",result);
        return result;
    }catch (error) {
        console.error("OTPSentCode", error);
    }
    
}