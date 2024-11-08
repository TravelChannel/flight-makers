export const AirSialIssueTicket = async(getPNRNumber) =>{

    const airSialAuthToken = JSON.parse(localStorage.getItem("airsialAuthToken"))
    // const airsialDetailPNR = JSON.parse(localStorage.getItem("PNRNumber"));
    const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Cookie", "ci_session_frontend=973dfq7a7hseirmqpda5477qhgi8mlvu");

const raw = JSON.stringify([
  {
    "Caller": "makePayment",
    "token": `${airSialAuthToken}`,
    "PNR": getPNRNumber
  }
]);

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

try{

    const responce = await fetch("http://demo.airsial.com.pk/starter/asmis/booking", requestOptions);
    const results = await responce.json();
    console.log("AirSial Issue-Ticket",results);
    return results;
    
}catch(error){
    console.log("AirSialViewDetailsErros:",error)
}
}